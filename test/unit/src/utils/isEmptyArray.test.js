const isEmptyArray = require('../../../../src/utils/isEmptyArray')

describe('isEmptyArray', () => {
  test('returns true for an empty array', () => {
    expect(isEmptyArray([])).toBe(true)
  })

  test('returns false for a non-empty array', () => {
    expect(isEmptyArray([1, 2, 3])).toBe(false)
  })
})
