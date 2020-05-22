const zip = require('./zip')

describe('#zip', () => {
  it('returns an array pairing up the elements of the specified arrays', () => {
    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
  })
})
