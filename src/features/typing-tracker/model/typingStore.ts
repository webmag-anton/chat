import { create } from 'zustand'

type TypingByChat = Record<string, Record<string, boolean>> // {chatID: {userID, isTyping}}
type Timers = Record<string, number>

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

    set((state) => ({
      typingByChat: {
        ...state.typingByChat,
        [chatId]: {
          ...(state.typingByChat[chatId] ?? {}),
          [userId]: true
        }
      }
    }))

    const timer = setTimeout(() => {
      get().clearTyping(chatId, userId)
    }, typingIndicatorDuration)

    set((state) => ({
      timers: { ...state.timers, [key]: timer }
    }))
  },

  clearTyping: (chatId, userId) => {
    const key = `${chatId}:${userId}`
    const timers = { ...get().timers }

    if (timers[key]) {
      clearTimeout(timers[key])
      delete timers[key]
    }

    set((state) => {
      const chatTyping = { ...(state.typingByChat[chatId] ?? {}) }
      delete chatTyping[userId]

      const typingByChat = { ...state.typingByChat }
      if (Object.keys(chatTyping).length === 0) {
        delete typingByChat[chatId]
      } else {
        typingByChat[chatId] = chatTyping
      }

      return { typingByChat, timers }
    })
  },

  hasTypingInChat: (chatId) => {
    const chatTyping = get().typingByChat[chatId]
    if (!chatTyping) return false
    return Object.values(chatTyping).some(Boolean)
  }
}))
