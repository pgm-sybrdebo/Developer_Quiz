/**
 * Write data to local storage
 * @param {*} key 
 * @param {*} data 
 * @returns 
 */
const writeToCache = (key, data) => localStorage.setItem(key, JSON.stringify(data));
/**
 * Read data from local storage
 * @param {*} key 
 * @returns 
 */
const readFromCache = (key) => JSON.parse(localStorage.getItem(key)) || null;
/**
 * Clear an item form local storage
 * @param {*} key 
 * @returns 
 */
const clearFromCache = (key) => localStorage.removeItem(key);

export { writeToCache, readFromCache, clearFromCache };