/**
 * The Main Application
 */

/**
 * import different modules
 */
import * as CS from './consts.js';
import { fetchQuiz } from './fetch.js';
import * as crDom from './crDomelements.js';
import { writeToCache, readFromCache, clearFromCache } from './storage.js';
import * as history from './history.js';
import * as helpers from './helpers.js';

const app = {
  /**
   * initialize function to start the application  and assign elements
   */
  async init () {
    document.title = CS.APP_TITLE;
    this.filter = readFromCache('filter') || CS.defaultFilter;
    this.quizData = readFromCache('quiz') || await fetchQuiz(this.filter);
    this.currentQuestion = 0;
    this.maxTime = CS.maxTimeMinutes * 60 * 1000;
    this.score = 0;
    this.selectedAnswers = [];

    clearFromCache('selectedAnswers');
    this.createForm();
    this.addToHistory(false, 'home');
    this.cacheElements();
    this.registerListeners();
  },
  /**
   * Create all DOM elements for the home page
   */

  createForm () {
    if (document.getElementById('leaderboardButton')) {
      document.getElementById('leaderboardButton').remove();
    }
    crDom.createLeaderboardButton();
    crDom.createForm();
    crDom.createCategoriesChoice(this.filter.category);
    crDom.createDifficultyChoice(this.filter.difficulty);
    crDom.createRangeSlider(this.filter.limit);
    crDom.createStartButton();
  },

  /**
   * Cache elements
   */
  cacheElements () {
    this.$menu = document.getElementById('menu');
    this.$form = document.getElementById('form');
    this.$formInputAmount = document.getElementById('amountSlider');
    this.$rangerSliderLabel = document.getElementById('rangerSliderLabel');
  },
  /**
   *  This function will register different event listeners
   */
  registerListeners () {
    /**
     * Listener 1: listens when you submit the form (filter) (click on start)
     * Here your filter data is retrieved from the form and stored in local storage. The quiz data that matches your settings will be fetched.
     */
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(this.$form);
      this.filter = {
        category: formData.get('categories'),
        difficulty: formData.get('difficulty'),
        limit: formData.get('amountSlider'),
      };
      writeToCache('filter', this.filter);
      fetchQuiz(this.filter).then((quizData) => {
        this.quizData = quizData;
        this.createQuizQA();
      });
      this.addToHistory(true, 'quiz');
    });

    /**
     * Listener 2: listens when you move the range slider
     */
    this.$formInputAmount.addEventListener('input', (e) => {
      this.$rangerSliderLabel.innerHTML = `${e.target.value} ${e.target.value == 1 ? 'question' : 'questions'}`;
    });

    /**
     * Listener 3: listens when you click previous or next in the browser
     */
    window.addEventListener('popstate', (e) => {
      if (e.state.title === 'home') {
        clearInterval(this.interval);
        this.$menu.innerHTML = '';
        this.init();
      } else if (e.state.title === 'leaderboard') {
        clearInterval(this.interval);
        this.$menu.innerHTML = '';
        this.createLeaderboard();
      } else if (e.state.title === 'quiz') {
        clearInterval(this.interval);
        this.createQuizQA();
      }
    });

    /**
     * Listener 4 listens when you click on the leaderboard icon and then you go to that page
     */
    this.$leaderboardButton = document.getElementById('leaderboardButton');
    document.body.addEventListener('click', (e) => {
      if (e.target.dataset.id !== 'leaderboard') {
        return false;
      }
      e.preventDefault();
      clearInterval(this.interval);
      this.createLeaderboard();
      this.addToHistory(true, 'leaderboard');
    });
  },

  /**
   *  This function will create each question and its possible answers on 1 page
   *  With the next button you go to the next question
   *  If multiple answers are possible, you can click multiple answers otherwise you can't
   *  There is also a possibility to go back to the home page
   * There is also a timer that counts down
   */
  createQuizQA () {
    this.$menu.innerHTML = '';
    this.createQA();
    let timeLeft = this.maxTime;
    /**
     * this causes the clock to tick and the progress bar to decrease
     */
    this.interval = setInterval(() => {
      timeLeft -= 1000;
      if (timeLeft <= 0) {
        clearInterval(this.interval);
        this.addSelectedToLocalStorage();
        this.currentQuestion += 1;
        if (this.currentQuestion === this.quizData.length) {
          this.stopQuiz();
        } else {
          this.createQuizQA();
        }
      } else {
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('countdownText').innerHTML = `${helpers.toAmountOfDigits(minutes, 2)}M ${helpers.toAmountOfDigits(seconds, 2)}S`;
        document.getElementById('countdownProgressBar').value = timeLeft;
      }
    }, 1000);

    /**
     * This keeps track of the selected answers
     */
    this.selectedAnswers = [];
    const answers = document.querySelectorAll(`.answer[data-id="${this.quizData[this.currentQuestion].id}"]`);
    answers.forEach((answer) => {
      answer.addEventListener('click', (e) => {
        if (this.quizData[this.currentQuestion].multiple_correct_answers === 'true') {
          e.target.classList.toggle('active');
          this.addOrRemoveArray(e.target.dataset.number);
        } else {
          this.selectedAnswers = [];
          this.selectedAnswers.push(e.target.dataset.number);
          helpers.setOneActiveAnswer(e.target);
        }
      });
    });

    /**
     * This wil listen when you click on the next button so you will see the next question
     */
    const $nextButton = document.getElementById('nextButton');
    $nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.addSelectedToLocalStorage();
      clearInterval(this.interval);
      this.currentQuestion += 1;
      if (this.currentQuestion === this.quizData.length) {
        this.stopQuiz();
      } else {
        this.createQuizQA();
      }
    });

    /**
     * THis will listen when you click on the home button so you will go to the home page
     */
    const $homeButton = document.getElementById('homeButton');
    $homeButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.addSelectedToLocalStorage();
      clearInterval(this.interval);
      this.$menu.innerHTML = '';
      this.init();
    });
  },

  /**
   * This function will create all DOM elements for all the questions and answers
   */
  createQA () {
    crDom.createHeadingQuestion(this.quizData.indexOf(this.quizData[this.currentQuestion]) + 1, this.quizData.length);
    crDom.createCountdown();
    crDom.createQuestion(this.quizData[this.currentQuestion].question);
    crDom.createAnswers(this.quizData[this.currentQuestion].answers, this.quizData[this.currentQuestion].id);
    crDom.createNextButton();
  },

  /**
   * This function will add the clicked element to the array if it is not already there and if it is there it removes the element from the array
   * @param {*} clicked
   */
  addOrRemoveArray (clicked) {
    if (this.selectedAnswers.indexOf(clicked) === -1) {
      this.selectedAnswers.push(clicked);
    } else {
      this.selectedAnswers.splice(this.selectedAnswers.indexOf(clicked), 1);
    }
  },

  /**
   * This function will write all the selected answers to the local storage
   */
  addSelectedToLocalStorage () {
    let allAnswersQuiz = readFromCache('selectedAnswers');
    allAnswersQuiz = allAnswersQuiz || {};
    allAnswersQuiz[this.quizData[this.currentQuestion].id] = this.selectedAnswers;
    writeToCache('selectedAnswers', allAnswersQuiz);
  },

  /**
   * This function will push or replace to history
   * @param {*} isPush
   * @param {*} title
   */
  addToHistory (isPush, title) {
    // make data object for state
    const data = {
      link: title,
      title: title,
    };

    // push or replace to history
    isPush ? history.add(data) : history.replace(data);
  },
  /***
   * This function will show your results
   */
  stopQuiz () {
    this.$menu.innerHTML = '';
    this.calculateScore();
    crDom.createScore(this.score);
    this.quizData.map((qA) => {
      crDom.createQuestion(qA.question);
      crDom.createAnswersResult(qA.answers, qA.id);
      this.allCorrectAnswers[qA.id].forEach((correctA) => {
        const correct = document.querySelector(`.answerResult[data-number="${correctA}"][data-id="${qA.id}"]`);
        correct.classList.add('correct');
      });
      this.allSelectedAnswers[qA.id].forEach((selectedA) => {
        const select = document.querySelector(`.answerResult[data-number="${selectedA}"][data-id="${qA.id}"]`);
        select.classList.add('selected');
        if (this.allCorrectAnswers[qA.id].indexOf(selectedA) === -1) {
          select.classList.add('wrong');
        }
      });
    });

    /**
     * This will check if you click on the home button to go to the home page
     */
    const $homeButtonResult = document.getElementById('homeButtonResult');
    $homeButtonResult.addEventListener('click', (e) => {
      e.preventDefault();
      this.$menu.innerHTML = '';
      this.init();
    });
  },
  /**
   * This function will calculate your score in percentage
   */
  calculateScore () {
    this.allCorrectAnswers = {};
    this.allSelectedAnswers = readFromCache('selectedAnswers');
    this.quizData.map((qA) => {
      const correctAnswers = [];
      for (const [key, value] of Object.entries(qA.correct_answers)) {
        if (value == 'true') {
          const correctAnswer = helpers.splitter(key, '_', 2);
          correctAnswers.push(correctAnswer);
        }
      }
      this.allCorrectAnswers[qA.id] = correctAnswers;
    });
    for (const [key, value] of Object.entries(this.allSelectedAnswers)) {
      if (value.sort().join(',') === this.allCorrectAnswers[key].sort().join(',')) {
        this.score++;
      }
    }
    this.score = this.score / Object.keys(this.allSelectedAnswers).length * 100;
    this.score = this.score.toFixed(2);
    let allScores = readFromCache('scores');
    allScores = allScores || {};
    allScores[new Date().toLocaleString()] = this.score;
    writeToCache('scores', allScores);
  },

  /**
   * This function will create the leaderboard
   */
  createLeaderboard () {
    this.$menu.innerHTML = '';
    crDom.createLeaderboardTitle();
    const allScores = readFromCache('scores');
    const allScoresSort = Object.entries(allScores).sort((a, b) => b[1] - a[1]);
    allScoresSort.forEach((score) => {
      crDom.createScoreTime(score[0], score[1]);
    });

    /**
     * This will listen when you click on the home button to go to the home page
     */
    this.$homeButtonScore = document.getElementById('homeButtonScore');
    this.$homeButtonScore.addEventListener('click', (e) => {
      e.preventDefault();
      this.$menu.innerHTML = '';
      this.init();
    });
  },
};

app.init();
