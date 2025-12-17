import { useEffect } from 'react'
import type { RealtimeChannel, Session } from '@supabase/supabase-js'
import { subscriptionManager } from '@/shared/lib'
import { subscribeToProfileUpdates } from '@/features/profilesList'
import { subscribeToUserMessages } from '@/entities/message'
import { handleNewMessage } from '@/features/realtime-messages'
import {
  subscribeToNewChatMembership,
  subscribeToNewChats,
  handleNewChatInsertion,
  handleNewChatMembership
} from '@/entities/chat'
import {
  subscribeToOnlineStatusTracker,
  useOnlineStatusStore
} from '@/features/online-status-tracker'
import {
  subscribeToTypingTracker,
  useTypingStore
} from '@/features/typing-tracker'

export const useRealtimeSubscriptions = (session: Session | null) => {
  const { setOnlineUsers } = useOnlineStatusStore.getState()
  const { setTyping } = useTypingStore.getState()

  useEffect(() => {
    // subscribe to Realtime only after session exists
    if (!session) {
      subscriptionManager.clearSubscriptions()
      setOnlineUsers({})
      return
    }

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
      handleNewChatMembership
    )
    subscriptionManager.addSubscription(newChatMembershipChannel)

    const newChatsChannel: RealtimeChannel = subscribeToNewChats((chat) =>
      handleNewChatInsertion(loggedInUserId, chat)
    )
    subscriptionManager.addSubscription(newChatsChannel)

    const onlineStatusChannel = subscribeToOnlineStatusTracker(loggedInUserId)
    subscriptionManager.addSubscription(onlineStatusChannel)

    const typingTrackerChannel = subscribeToTypingTracker(
      ({ chatId, userId, isTyping }) => {
        if (isTyping) {
          setTyping(chatId, userId)
        }
      }
    )
    subscriptionManager.addSubscription(typingTrackerChannel)

    return subscriptionManager.clearSubscriptions
  }, [session])
}