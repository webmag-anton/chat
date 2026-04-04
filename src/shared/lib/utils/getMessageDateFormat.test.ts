import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getMessageDateFormat } from './getMessageDateFormat'

describe('getMessageDateFormat', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-26T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns null when there is no date', () => {
    expect(getMessageDateFormat(null)).toBeNull()
  })

  it('formats recent messages as time', () => {
    expect(getMessageDateFormat('2026-03-26T10:05:00.000Z')).toBe('10:05')
  })

  it('formats messages from the last week as weekday only', () => {
    expect(getMessageDateFormat('2026-03-24T09:00:00.000Z')).toBe('Tue')
  })

  it('formats older messages as date with weekday', () => {
    expect(getMessageDateFormat('2026-03-10T09:00:00.000Z')).toBe('10.03.2026 Tue')
  })
})
