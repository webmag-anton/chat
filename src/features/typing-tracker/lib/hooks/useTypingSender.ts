import { useRef, useCallback } from 'react'
import { sendTypingEvent } from '../../api/sendTypingEvent'
import type { TypingPayload } from '../../api/sendTypingEvent'

export const useTypingSender = (chatId: string | null, userId: string | null) => {
  const lastSentRef = useRef(0)
  const throttleMs = 1200

  const notifyTyping = useCallback(async () => {
    if (!chatId || !userId) return

    const now = Date.now()
    if (now - lastSentRef.current < throttleMs) return
    lastSentRef.current = now

    const payload: TypingPayload = { chatId, userId, isTyping: true }
    await sendTypingEvent(payload)
  }, [chatId, userId])

  const notifyStopped = useCallback(async () => {
    if (!chatId || !userId) return

    const payload: TypingPayload = {
      chatId,
      userId,
      isTyping: false
    }
    await sendTypingEvent(payload)
  }, [chatId, userId])

  return { notifyTyping, notifyStopped }
}
