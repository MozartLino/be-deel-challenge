const isNonEmptyArray = require('../../../../src/utils/isNonEmptyArray')

describe('isNonEmptyArray', () => {
  test('returns true for a non-empty array', () => {
    expect(isNonEmptyArray([1, 2, 3])).toBe(true)
  })

  test('returns false for an empty array', () => {
    expect(isNonEmptyArray([])).toBe(false)
  })

  test('returns false for non-array values', () => {
    expect(isNonEmptyArray(null)).toBe(false)
    expect(isNonEmptyArray(undefined)).toBe(false)
    expect(isNonEmptyArray(123)).toBe(false)
    expect(isNonEmptyArray('abc')).toBe(false)
    expect(isNonEmptyArray({})).toBe(false)
  })
})
