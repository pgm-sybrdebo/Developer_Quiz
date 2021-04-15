/**
 * Push to history
 * @param {*} data 
 */
export const add = (data) => {
  history.pushState(data, null, data.link);
  document.title = `Developer quiz - ${data.title}`; 
};

/**
 * Replace to history only for the home page
 * @param {*} data 
 */
export const replace = (data) => {
  history.replaceState(data, null, data.link);
  document.title = `Developer quiz - ${data.title}`; 
};