import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useProcessedMessages } from './useProcessedMessages'
import type { Message } from '@/entities/message'

describe('useProcessedMessages', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-26T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns an empty list without messages or opponent', () => {
    const { result: noMessages } =
      renderHook(() => useProcessedMessages(undefined, 'user-2'))
    expect(noMessages.current).toEqual([])

    const { result: noOpponent } =
      renderHook(() => useProcessedMessages([], null))
    expect(noOpponent.current).toEqual([])
  })

  it('builds message metadata for grouped messages, gaps and day changes', () => {
    const messages: Message[] = [
      {
        id: '1',
        chat_id: 'chat-1',
        sender_id: 'user-2',
        content: '"First"',
        created_at: '2026-03-25T09:00:00.000Z'
      },
      {
        id: '2',
        chat_id: 'chat-1',
        sender_id: 'user-2',
        content: '"Second"',
        created_at: '2026-03-25T09:05:00.000Z'
      },
      {
        id: '3',
        chat_id: 'chat-1',
        sender_id: 'me',
        content: '"Reply"',
        created_at: '2026-03-25T09:30:00.000Z'
      },
      {
        id: '4',
        chat_id: 'chat-1',
        sender_id: 'user-2',
        content: '"Next day"',
        created_at: '2026-03-26T08:00:00.000Z'
      }
    ]

    const { result } =
      renderHook(() => useProcessedMessages(messages, 'user-2'))

    expect(result.current).toHaveLength(4)

    expect(result.current[0]).toMatchObject({
      isOpponent: true,
      isShowAvatar: false,
      isLastInSeries: false,
      isShowNewDate: true,
      dateLabel: 'March 25',
      timeLabel: '09:00'
    })

    expect(result.current[1]).toMatchObject({
      isOpponent: true,
      isShowAvatar: true,
      isLastInSeries: true,
      isShowNewDate: false,
      dateLabel: undefined,
      timeLabel: '09:05'
    })

    expect(result.current[2]).toMatchObject({
      isOpponent: false,
      isShowAvatar: true,
      isLastInSeries: true,
      isShowNewDate: false,
      dateLabel: undefined,
      timeLabel: '09:30'
    })

    expect(result.current[3]).toMatchObject({
      isOpponent: true,
      isShowAvatar: true,
      isLastInSeries: true,
      isShowNewDate: true,
      dateLabel: 'March 26',
      timeLabel: '08:00'
    })
  })
})
