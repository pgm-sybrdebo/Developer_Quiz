/**
 * This module will fetch the quiz data from tha quiz api
 */
import * as CS from './consts.js';
import { writeToCache } from './storage.js';

export const fetchQuiz = async (filterData) => {
  const url = new URL(CS.QUIZ_API);
  url.searchParams.set('apiKey', CS.QUIZ_TOKEN);
  url.searchParams.set('category', filterData.category === 'All' ? '' : filterData.category);
  url.searchParams.set('difficulty', filterData.difficulty);
  url.searchParams.set('limit', filterData.limit);
  try {
    const response = await fetch(url);
    const data = await response.json();
    writeToCache('quiz', data);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
