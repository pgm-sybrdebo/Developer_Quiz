import * as CS from './consts.js';

// Create leaderboard button on the header
export const createLeaderboardButton = () => {
  const leaderboardButton = createElement({
    tagname: 'button', parent: document.querySelector('header'), id: 'leaderboardButton', classNamesList: ['leaderboardButton'],
  });
  leaderboardButton.innerHTML = CS.leaderboardIcon;
  leaderboardButton.setAttribute('data-id', 'leaderboard');
};

// Create form element
export const createForm = () => {
  const formElement = createElement({ tagname: 'form', parent: document.getElementById('menu'), id: 'form' });
};

// Create category choices on the Home page
export const createCategoriesChoice = (currentCategory) => {
  const categoriesChoice = createElement({ tagname: 'div', parent: document.getElementById('form') });
  const categoriesChoiceTitle = createElement({ tagname: 'h2', parent: categoriesChoice, classNamesList: ['choice__title', 'categories__title'] });
  categoriesChoiceTitle.innerHTML = 'Categories';
  const categoriesChoiceList = createElement({ tagname: 'div', parent: categoriesChoice, classNamesList: ['categories_choices', 'filter__choices'] });

  CS.categories.forEach((choice) => {
    const categoriesChoiceContainer = createElement({ tagname: 'div', parent: categoriesChoiceList });
    const categoriesChoiceInput = createElement({ tagname: 'input', parent: categoriesChoiceContainer, id: choice });
    categoriesChoiceInput.type = 'radio';
    categoriesChoiceInput.value = choice;
    categoriesChoiceInput.name = 'categories';
    choice === currentCategory ? categoriesChoiceInput.checked = true : '';

    const categoriesChoiceLabel = createElement({ tagname: 'label', parent: categoriesChoiceContainer, classNamesList: ['filter__choice', 'categories__choice'] });
    categoriesChoiceLabel.htmlFor = choice;
    categoriesChoiceLabel.innerHTML = choice;
  });
};

// Create difficulty choices on home page
export const createDifficultyChoice = (currentDifficulty) => {
  const difficultyChoice = createElement({ tagname: 'div', parent: document.getElementById('form') });
  const difficultyChoiceTitle = createElement({ tagname: 'h2', parent: difficultyChoice, classNamesList: ['choice__title', 'difficulty__title'] });
  difficultyChoiceTitle.innerHTML = 'Difficulty';
  const difficultyChoiceList = createElement({ tagname: 'div', parent: difficultyChoice, classNamesList: ['difficulty_choices', 'filter__choices'] });

  CS.difficulty.forEach((choice) => {
    const difficultyChoiceContainer = createElement({ tagname: 'div', parent: difficultyChoiceList });
    const difficultyChoiceInput = createElement({ tagname: 'input', parent: difficultyChoiceContainer, id: choice });
    difficultyChoiceInput.type = 'radio';
    difficultyChoiceInput.value = choice;
    difficultyChoiceInput.name = 'difficulty';
    choice === currentDifficulty ? difficultyChoiceInput.checked = true : '';

    const difficultyChoiceLabel = createElement({ tagname: 'label', parent: difficultyChoiceContainer, classNamesList: ['filter__choice', 'difficulty__choice'] });
    difficultyChoiceLabel.htmlFor = choice;
    difficultyChoiceLabel.innerHTML = choice;
  });
};

// Create range slider on Home page
export const createRangeSlider = (currentAmount) => {
  const amountQ = createElement({ tagname: 'div', parent: document.getElementById('form') });
  const amountQLabel = createElement({
    tagname: 'label', parent: amountQ, id: 'rangerSliderLabel', classNamesList: ['rangeSlider__label'],
  });
  amountQLabel.innerHTML = `${currentAmount} ${currentAmount === 1 ? 'question' : 'questions'}`;
  amountQLabel.htmlFor = 'amountSlider';
  const amountQSlider = createElement({
    tagname: 'input', parent: amountQ, id: 'amountSlider', classNamesList: ['slider'],
  });
  amountQSlider.type = 'range';
  amountQSlider.name = 'amountSlider';
  amountQSlider.value = currentAmount;
  amountQSlider.min = CS.amountOfQuestions.min;
  amountQSlider.max = CS.amountOfQuestions.max;
};

// Create start button on home page
export const createStartButton = () => {
  const startButton = createElement({
    tagname: 'button', parent: document.getElementById('form'), id: 'startButton', classNamesList: ['startButton'],
  });
  startButton.innerHTML = 'Start';
  startButton.type = 'submit';
};

// Create heading on every question quiz
export const createHeadingQuestion = (currentNumber, total) => {
  const headingBlock = createElement({ tagname: 'div', parent: document.getElementById('menu'), classNamesList: ['headingQuestion'] });
  const headingBlockTitle = createElement({ tagname: 'h2', parent: headingBlock, classNamesList: ['headingQuestion__title'] });
  headingBlockTitle.innerHTML = `Question ${currentNumber}/${total}`;
  const homeButton = createElement({
    tagname: 'button', parent: headingBlock, id: 'homeButton', classNamesList: ['homeButton'],
  });
  homeButton.innerHTML = CS.home;
};

// Create countdown timer an progress bar
export const createCountdown = () => {
  const countDown = createElement({
    tagname: 'div', parent: document.getElementById('menu'), id: 'countdown', classNamesList: ['countdown'],
  });
  const countdownText = createElement({
    tagname: 'span', parent: countDown, id: 'countdownText', classNamesList: ['countdown__text'],
  });
  countdownText.innerHTML = '01M 00S';
  const countdownProgressBar = createElement({
    tagname: 'progress', parent: countDown, id: 'countdownProgressBar', classNamesList: ['countdown__progressBar'],
  });
  countdownProgressBar.min = 0;
  countdownProgressBar.max = CS.maxTimeMinutes * 60 * 1000;
  countdownProgressBar.value = CS.maxTimeMinutes * 60 * 1000;
};

// Create question
export const createQuestion = (question) => {
  const questionText = createElement({ tagname: 'p', parent: document.getElementById('menu'), classNamesList: ['question'] });
  questionText.innerHTML = question;
};

// Create every possible answer
export const createAnswers = (answersData, questionId) => {
  const answersList = createElement({ tagname: 'ul', parent: document.getElementById('menu'), classNamesList: ['answersList'] });
  for (const [key, value] of Object.entries(answersData)) {
    if (value !== null) {
      const answersListAnswer = createElement({ tagname: 'li', parent: answersList, classNamesList: ['answer'] });

      answersListAnswer.textContent = value;
      answersListAnswer.setAttribute('data-number', key);
      answersListAnswer.setAttribute('data-id', questionId);
    }
  }
};

// Create the next button on every question
export const createNextButton = () => {
  const nextButton = createElement({
    tagname: 'button', parent: document.getElementById('menu'), id: 'nextButton', classNamesList: ['nextButton'],
  });
  nextButton.innerHTML = 'Next';
};

// Create results title and score
export const createScore = (scorePercent) => {
  const scoreTitle = createElement({ tagname: 'h2', parent: document.getElementById('menu'), classNamesList: ['score__title'] });
  scoreTitle.innerHTML = 'Results';
  const homeButton = createElement({
    tagname: 'button', parent: document.getElementById('menu'), id: 'homeButtonResult', classNamesList: ['homeButtonResult'],
  });
  homeButton.innerHTML = CS.home;
  const score = createElement({
    tagname: 'span', parent: document.getElementById('menu'), id: 'score', classNamesList: ['score'],
  });
  score.innerHTML = `score: ${scorePercent}%`;
};

// Create the LeaderboartTitle
export const createLeaderboardTitle = () => {
  const leaderboardTitle = createElement({ tagname: 'h2', parent: document.getElementById('menu'), classNamesList: ['leaderboard__title'] });
  leaderboardTitle.innerHTML = 'Your scores';
  const homeButton = createElement({
    tagname: 'button', parent: document.getElementById('menu'), id: 'homeButtonScore', classNamesList: ['homeButtonScore'],
  });
  homeButton.innerHTML = CS.home;
};

// Create all your scores and the time when you did it on the leaderboard
export const createScoreTime = (time, score) => {
  const scoreBlock = createElement({ tagname: 'div', parent: document.getElementById('menu'), classNamesList: ['scoreBlock'] });
  const scoreTime = createElement({ tagname: 'span', parent: scoreBlock, classNamesList: ['scoreBlock__time'] });
  scoreTime.innerHTML = time;
  const scorePercent = createElement({ tagname: 'span', parent: scoreBlock, classNamesList: ['scoreBlock__score'] });
  scorePercent.innerHTML = `${score} %`;
};

// Create every answer in the results
export const createAnswersResult = (answersData, questionId) => {
  const answersList = createElement({ tagname: 'ul', parent: document.getElementById('menu'), classNamesList: ['answersList'] });
  for (const [key, value] of Object.entries(answersData)) {
    if (value !== null) {
      const answersListAnswer = createElement({ tagname: 'li', parent: answersList, classNamesList: ['answerResult'] });
      answersListAnswer.textContent = value;
      answersListAnswer.setAttribute('data-number', key);
      answersListAnswer.setAttribute('data-id', questionId);
    }
  }
};

// create dom element
const createElement = ({
  tagname, parent, id = '', classNamesList = [],
}) => {
  const element = document.createElement(tagname);
  classNamesList && classNamesList.length > 0 ? element.classList.add(...classNamesList) : '';
  id !== '' ? element.id = id : '';
  parent.appendChild(element);
  return element;
};
