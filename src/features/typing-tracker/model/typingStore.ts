import { create } from 'zustand'
import { produce } from 'immer'

type TypingByChat = Record<string, Record<string, boolean>> // {chatID: {userID, isTyping}}
type TimerId = ReturnType<typeof setTimeout>
type Timers = Record<string, TimerId>

type TypingStore = {
  typingByChat: TypingByChat
  timers: Timers
  setTyping: (chatId: string, userId: string) => void
  clearTyping: (chatId: string, userId: string) => void
  hasTypingInChat: (chatId: string) => boolean
}

const typingIndicatorDuration = 3000

export const useTypingStore = create<TypingStore>((set, get) => ({
  typingByChat: {},
  timers: {},

  setTyping: (chatId, userId) => {
    const key = `${chatId}:${userId}`

    const oldTimer = get().timers[key]
    if (oldTimer) clearTimeout(oldTimer)

    set(produce(state => {
      if (!state.typingByChat[chatId]) {
        state.typingByChat[chatId] = {}
      }
      state.typingByChat[chatId][userId] = true
    }))

    const timer = setTimeout(() => {
      get().clearTyping(chatId, userId)
    }, typingIndicatorDuration)

    set(produce(state => {
      state.timers[key] = timer
    }))
  },

  clearTyping: (chatId, userId) => {
    const key = `${chatId}:${userId}`

    set(produce(state => {
      const timer = state.timers[key]
      if (timer) {
        clearTimeout(timer)
        delete state.timers[key]
      }

      const chatTyping = state.typingByChat[chatId]
      if (!chatTyping) return

      delete chatTyping[userId]

      if (Object.keys(chatTyping).length === 0) {
        delete state.typingByChat[chatId]
      }
    }))
  },

  hasTypingInChat: (chatId) => {
    const chatTyping = get().typingByChat[chatId]
    return !!chatTyping && Object.values(chatTyping).some(Boolean)
  }
}))