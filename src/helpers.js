/**
 * This function will set only one answer active
 * @param {*} selected 
 */
export const setOneActiveAnswer = (selected) => {
  const $previousSelected = document.querySelector(`.answer.active`)
  if ($previousSelected) {
    $previousSelected.classList.remove('active');
  }
  selected.classList.add('active');
};

/**
 * This function will check if you need another 0 before your digit
 * @param {*} number 
 * @param {*} amount 
 * @returns 
 */
export const toAmountOfDigits = (number, amount) => {
  let str = String(number);
  while (str.length < amount) {
    str = `0${str}`;
  }
  return str;
};

/**
 * This function will split a string on the nth representation of a character
 * @param {*} string 
 * @param {*} divider 
 * @param {*} amount 
 * @returns 
 */
export const splitter = (string, divider, amount) => {
  const tokens = string.split(divider).slice(0, amount);
  const result = tokens.join(divider);
  return result
};