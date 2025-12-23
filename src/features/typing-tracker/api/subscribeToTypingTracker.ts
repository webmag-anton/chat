import type { TypingPayload } from './sendTypingEvent'
import { getTypingChannel } from './typingChannel'

export const subscribeToTypingTracker = (
  onTyping: (payload: TypingPayload) => void
) => {
  const channel = getTypingChannel()

  channel.on('broadcast', { event: 'typing' }, ({ payload }) => {
    if (!payload?.chatId || !payload?.userId) return
    onTyping(payload)
  })

  return channel
}