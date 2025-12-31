import { create } from 'zustand'

export interface ChatState {
  currentChatId: string | null
  currentOpponentId: string | null
  currentOpponentName: string | null
  currentOpponentAvatar: string | null
  currentOpponentAvatarVersion: number | null
  currentGroupName: string | null
  setActivePrivateChat: (
    chatId: string | null,
    opponentId: string | null,
    opponentName: string | null,
    avatar: string | null,
    avatarVersion: number | null
  ) => void
  setActiveGroupChat: (chatId: string | null, groupName: string | null) => void
  updateCurrentChatId: (chatId: string | null) => void
}

export const useChatStore = create<ChatState>((set) => ({
  currentChatId: null,
  currentOpponentId: null,
  currentOpponentName: null,
  currentOpponentAvatar: null,
  currentOpponentAvatarVersion: null,
  currentGroupName: null,
  setActivePrivateChat: (
    chatId,
    opponentId,
    opponentName,
    avatar,
    avatarVersion
  ) =>
    set({
      currentChatId: chatId,
      currentOpponentId: opponentId,
      currentOpponentName: opponentName,
      currentOpponentAvatar: avatar,
      currentOpponentAvatarVersion: avatarVersion,
      currentGroupName: null
    }),
  setActiveGroupChat: (chatId, groupName) =>
    set({
      currentChatId: chatId,
      currentGroupName: groupName,
      currentOpponentId: null,
      currentOpponentName: null
    }),
  updateCurrentChatId: (chatId) => set({ currentChatId: chatId })
}))