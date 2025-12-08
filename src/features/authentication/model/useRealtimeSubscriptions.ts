import { useEffect } from 'react'
import type { RealtimeChannel, Session } from '@supabase/supabase-js'
import { subscriptionManager } from '@/shared/lib'
import { subscribeToProfileUpdates } from '@/features/profilesList'
import { subscribeToUserMessages, handleNewMessage } from '@/entities/message'
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

export const useRealtimeSubscriptions = (session: Session | null) => {
  const { setOnlineUsers } = useOnlineStatusStore()

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

    return subscriptionManager.clearSubscriptions
  }, [session])
}