import { create } from 'zustand'

export type listTypeVariants = 'profiles' | 'chats'

interface ChatSidebarState {
  listType: listTypeVariants,
  toggleListType: () => void
}

export const useChatSidebarStore = create<ChatSidebarState>((set) => ({
  listType: 'profiles',
  toggleListType: () =>
    set((state) => ({
      listType: state.listType === 'profiles' ? 'chats' : 'profiles'
    }))
}))