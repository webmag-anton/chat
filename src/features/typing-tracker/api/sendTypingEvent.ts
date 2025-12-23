import { getTypingChannel } from './typingChannel'

export type TypingPayload = {
  chatId: string
  userId: string
  isTyping: boolean
}

export const sendTypingEvent = (payload: TypingPayload) => {
  return getTypingChannel().send({
    type: 'broadcast',
    event: 'typing',
    payload
  })
}