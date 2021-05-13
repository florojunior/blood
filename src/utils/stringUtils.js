/**
 * Checks if a string contains only white-space.
 * @param {*} str
 * @returns Boolean
 */
const hasOnlyWhiteSpaces = (str) => !str.trim();

/**
 * Checks if a string is empty, null, undefined or contains only white-space.
 * @param {*} str
 * @returns Boolean
 */
const isEmpty = (str) => !str || 0 === str.length || hasOnlyWhiteSpaces(str);

/**
 * Checks if a string is blank, null or undefined
 * @param {*} str
 * @returns Boolean
 */
const isBlank = (str) => !str || /^\s*$/.test(str);

/**
 * Checks if a string is empty or blank
 * @param {*} str
 * @returns Boolean
 */
const isEmptyOrIsBlank = (str) => isEmpty(str) || isBlank(str);

export default {
  isEmpty,
  isBlank,
  hasOnlyWhiteSpaces,
  isEmptyOrIsBlank,
};
