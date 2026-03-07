import { create } from 'zustand'
import type { listType } from '../types'

interface ChatSidebarState {
  listTypeOverride: listType | null
  toggleListType: (defaultType: listType) => void
  setListTypeOverride: (type: listType | null) => void
  reset: () => void
}

export const useChatSidebarStore = create<ChatSidebarState>((set) => ({
  listTypeOverride: null,
  toggleListType: (defaultType) =>
    set((state) => {
      const current = state.listTypeOverride ?? defaultType
      return { listTypeOverride: current === 'users' ? 'chats' : 'users' }
    }),
  setListTypeOverride: (type) => set({ listTypeOverride: type }),
  reset: () => set({ listTypeOverride: null })
}))