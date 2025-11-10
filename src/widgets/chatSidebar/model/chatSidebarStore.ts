import { create } from 'zustand'
import type { listType } from '../types'

interface ChatSidebarState {
  listType: listType,
  toggleListType: () => void
}

export const useChatSidebarStore = create<ChatSidebarState>((set) => ({
  listType: 'users',
  toggleListType: () =>
    set((state) => ({
      listType: state.listType === 'users' ? 'chats' : 'users'
    }))
}))