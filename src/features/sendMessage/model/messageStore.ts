import { create } from 'zustand'

export interface MessageState {
  message: string | undefined
  setMessage: (message: string) => void
  messageTextareaRows: number
  setMessageTextareaRows: (rows: number) => void
  resetTextarea: () => void
}

export const useMessageStore = create<MessageState>((set) => ({
  message: '',
  messageTextareaRows: 1,
  setMessage: (message) => set({ message }),
  setMessageTextareaRows: (rows) => set({ messageTextareaRows: rows }),
  resetTextarea: () => set({ message: undefined, messageTextareaRows: 1 })
}))