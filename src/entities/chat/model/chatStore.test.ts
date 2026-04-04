import { afterEach, describe, expect, it } from 'vitest'
import { useChatStore } from './chatStore'

const resetStore = () => {
  useChatStore.setState({
    currentChatId: null,
    currentOpponentId: null,
    currentOpponentName: null,
    currentOpponentAvatar: null,
    currentOpponentAvatarVersion: null,
    currentGroupName: null
  })
}

describe('useChatStore', () => {
  afterEach(() => {
    resetStore()
  })

  it('stores the active private chat details', () => {
    useChatStore.getState().setActivePrivateChat(
      'chat-1',
      'user-2',
      'Alice',
      'avatars/alice.png',
      3
    )

    expect(useChatStore.getState()).toMatchObject({
      currentChatId: 'chat-1',
      currentOpponentId: 'user-2',
      currentOpponentName: 'Alice',
      currentOpponentAvatar: 'avatars/alice.png',
      currentOpponentAvatarVersion: 3,
      currentGroupName: null
    })
  })

  it('switches to a group chat and clears private opponent data', () => {
    useChatStore.getState().setActivePrivateChat(
      'chat-1',
      'user-2',
      'Alice',
      'avatars/alice.png',
      3
    )

    useChatStore.getState().setActiveGroupChat('group-1', 'Frontend team')

    expect(useChatStore.getState()).toMatchObject({
      currentChatId: 'group-1',
      currentGroupName: 'Frontend team',
      currentOpponentId: null,
      currentOpponentName: null
    })
  })

  it('updates only the current chat id when needed', () => {
    useChatStore.getState().setActivePrivateChat(
      'chat-1',
      'user-2',
      'Alice',
      'avatars/alice.png',
      3
    )

    useChatStore.getState().updateCurrentChatId('chat-2')

    expect(useChatStore.getState()).toMatchObject({
      currentChatId: 'chat-2',
      currentOpponentId: 'user-2',
      currentOpponentName: 'Alice'
    })
  })

  it('clears all chat data', () => {
    useChatStore.getState().setActivePrivateChat(
      'chat-1',
      'user-2',
      'Alice',
      'avatars/alice.png',
      3
    )

    useChatStore.getState().clearActiveChat()

    expect(useChatStore.getState()).toMatchObject({
      currentChatId: null,
      currentOpponentId: null,
      currentOpponentName: null,
      currentOpponentAvatar: null,
      currentOpponentAvatarVersion: null,
      currentGroupName: null
    })
  })
})
