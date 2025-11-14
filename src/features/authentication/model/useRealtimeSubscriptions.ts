import { useEffect } from 'react'
import type { RealtimeChannel, Session } from '@supabase/supabase-js'
import { subscriptionManager } from '@/shared/lib/subscriptionManager'
import { subscribeToProfileUpdates } from '@/features/profilesList'
import { subscribeToUserMessages, handleNewMessage } from '@/entities/message'
import {
  subscribeToNewChatMembership,
  useChatStore,
  subscribeToNewChats,
  handleNewChatInsertion,
  handleNewChatMembership,
  type ChatMember
} from '@/entities/chat'

export const useRealtimeSubscriptions = (session: Session | null) => {
  const chatStore = useChatStore()

  useEffect(() => {
    // subscribe to Realtime only after session exists
    if (!session) return

    // prevent multi subscriptions on re-renders (re-log in or refreshing of session)
    if (subscriptionManager.subscriptions.length) return

    const loggedInUserId = session.user.id

    const profileUpdatesChannel: RealtimeChannel = subscribeToProfileUpdates()
    subscriptionManager.addSubscription(profileUpdatesChannel)

    const userMessagesChannel: RealtimeChannel = subscribeToUserMessages(
      loggedInUserId,
      handleNewMessage
    )
    subscriptionManager.addSubscription(userMessagesChannel)

    const newChatMembershipChannel: RealtimeChannel = subscribeToNewChatMembership(
      loggedInUserId,
      (newChatMember: ChatMember | {}) =>
        handleNewChatMembership(newChatMember, chatStore)
    )
    subscriptionManager.addSubscription(newChatMembershipChannel)

    const newChatsChannel: RealtimeChannel = subscribeToNewChats((chat) =>
      handleNewChatInsertion(loggedInUserId, chat)
    )
    subscriptionManager.addSubscription(newChatsChannel)

    return subscriptionManager.clearSubscriptions
  }, [session])
}