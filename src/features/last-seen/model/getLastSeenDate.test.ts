import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getLastSeenDate } from './getLastSeenDate'

describe('getLastSeenDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-26T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns a fallback for empty values', () => {
    expect(getLastSeenDate(null)).toBe('last seen a long time ago')
  })

  it('returns a fallback for invalid dates', () => {
    expect(getLastSeenDate('not-a-date')).toBe('last seen a long time ago')
  })

  it('shows right now for fresh timestamps', () => {
    expect(getLastSeenDate('2026-03-26T11:59:31.000Z')).toBe('last seen right now')
  })

  it('pluralizes minutes correctly', () => {
    expect(getLastSeenDate('2026-03-26T11:58:00.000Z')).toBe('last seen 2 minutes ago')
  })

  it('pluralizes hours correctly', () => {
    expect(getLastSeenDate('2026-03-26T09:00:00.000Z')).toBe('last seen 3 hours ago')
  })

  it('formats older dates with weekday', () => {
    expect(getLastSeenDate('2026-03-20T09:00:00.000Z')).toBe('last seen 20.03.2026 Fri')
  })
})
