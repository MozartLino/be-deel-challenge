/**
 * Check if a value is a non-empty `Array`.
 */
const isNonEmptyArray = (value) => Array.isArray(value) && value.length > 0;

module.exports = isNonEmptyArray;
