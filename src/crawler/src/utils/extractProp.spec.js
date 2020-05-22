const extractProp = require('./extractProp')

describe('#extractProp', () => {
  describe('when there is the specified prop', () => {
    it('returns the prop', () => {
      expect(extractProp('name')({ name: 'first name' })).toBe('first name')
    })
  })

  describe('when there is not the specified prop', () => {
    it('returns undefined', () => {
      expect(extractProp('surname')({ name: 'first name' })).toBeUndefined()
    })
  })
})
