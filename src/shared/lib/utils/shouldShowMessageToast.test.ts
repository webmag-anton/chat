import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('shouldShowMessageToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-26T12:00:00.000Z'))
    vi.resetModules()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the first toast for a chat', async () => {
    const { shouldShowMessageToast } = await import('./shouldShowMessageToast')

    expect(shouldShowMessageToast('chat-1')).toBe(true)
  })

  it('suppresses repeated toasts within five seconds for the same chat', async () => {
    const { shouldShowMessageToast } = await import('./shouldShowMessageToast')

    expect(shouldShowMessageToast('chat-1')).toBe(true)
    vi.advanceTimersByTime(4999)
    expect(shouldShowMessageToast('chat-1')).toBe(false)
  })

  it('allows a toast again after the cooldown expires', async () => {
    const { shouldShowMessageToast } = await import('./shouldShowMessageToast')

    shouldShowMessageToast('chat-1')
    vi.advanceTimersByTime(5001)

    expect(shouldShowMessageToast('chat-1')).toBe(true)
  })

  it('tracks cooldown per chat instead of globally', async () => {
    const { shouldShowMessageToast } = await import('./shouldShowMessageToast')

    expect(shouldShowMessageToast('chat-1')).toBe(true)
    expect(shouldShowMessageToast('chat-2')).toBe(true)
  })
})
