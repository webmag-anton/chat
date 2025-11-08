import { create } from 'zustand'

interface ChatState {
  currentChatId: string | null
  currentUserId: string | null
  currentUserName: string | null
  currentGroupName: string | null
  setActivePrivateChat: (
    chatId: string | null, userId: string | null, userName: string | null
  ) => void
  setActiveGroupChat: (chatId: string | null, groupName: string | null) => void
  updateCurrentChatId: (chatId: string | null) => void
}

export const useChatStore = create<ChatState>((set) => ({
  currentChatId: null,
  currentUserId: null,
  currentUserName: null,
  currentGroupName: null,
  setActivePrivateChat: (chatId, userId, userName) =>
    set({
      currentChatId: chatId,
      currentUserId: userId,
      currentUserName: userName,
      currentGroupName: null
    }),
  setActiveGroupChat: (chatId, groupName) =>
    set({
      currentChatId: chatId,
      currentGroupName: groupName,
      currentUserId: null,
      currentUserName: null
    }),
  updateCurrentChatId: (chatId) => set({ currentChatId: chatId })
}))