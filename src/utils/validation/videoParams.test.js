import { isBadVideoParams } from './videoParams'
import { test, given } from 'sazerac'

describe('Video parameter validation', () => {
  test(isBadVideoParams, () => {
    given(null).expect(true)
    given(undefined).expect(true)
    given({}).expect(true)
    given({ missing: 'sessionId' }).expect(true)
    given({ sessionId: '' }).expect(true)
    given({ sessionId: 'any-value' }).expect(false)
  })
})
