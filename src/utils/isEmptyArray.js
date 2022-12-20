const isNonEmptyArray = require('./isNonEmptyArray');

/**
 * Check if a value is a empty `Array`.
 */
const isEmptyArray = (value) => !isNonEmptyArray(value);

module.exports = isEmptyArray;
