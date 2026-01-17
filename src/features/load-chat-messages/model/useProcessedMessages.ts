import { useMemo } from 'react'
import type { Message } from '@/entities/message'

interface ProcessedMessage {
  message: Message
  isOpponent: boolean
  isShowAvatar: boolean
  isShowNewDate: boolean
  dateLabel?: string
  timeLabel: string
}

export const useProcessedMessages = (
  messages: Message[] | undefined,
  opponentId: string | null
) => {
  return useMemo<ProcessedMessage[]>(() => {
    if (!messages || !opponentId) return []

    let lastDate = ''

    return messages.map((m, i) => {
      const prev = messages[i - 1]
      const next = messages[i + 1]

      const isOpponent = m.sender_id === opponentId
      const isLastInSeries = !next || next.sender_id !== m.sender_id

      const diffMs = prev
        ? new Date(m.created_at).getTime() -
          new Date(prev.created_at).getTime()
        : 0

      const is15MinutesPast = diffMs > 1000 * 60 * 15
      const isShowAvatar = isLastInSeries || is15MinutesPast

      const dateObj = new Date(m.created_at)

      const dateKey = dateObj.toLocaleDateString('en-GB')
      const isShowNewDate = dateKey !== lastDate
      lastDate = dateKey

      return {
        message: m,
        isOpponent,
        isShowAvatar,
        isShowNewDate,
        dateLabel: isShowNewDate
          ? dateObj.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric'
            })
          : undefined,
        timeLabel: dateObj.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    })
  }, [messages, opponentId])
}