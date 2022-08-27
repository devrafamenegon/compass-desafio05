import isValidUuid from '../../src/api/utils/isValidUuid'

describe('isValidUuid()', () => {
  it('should return true if uuid is valid', () => {
    const uuid = 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6'
    const isValid = isValidUuid(uuid)

    expect(isValid).toBe(true)
  })

  it('should return false if uuid is invalid', () => {
    const uuid = 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6-'
    const isValid = isValidUuid(uuid)

    expect(isValid).toBe(false)
  })
})
