import { useEffect } from 'react'
import type { RealtimeChannel, Session } from '@supabase/supabase-js'
import { subscriptionManager } from '@/shared/lib/subscriptionManager'
import { subscribeToProfileUpdates } from '@/features/profilesList'
import { type Message, subscribeToUserMessages } from '@/entities/message'
import { queryClient } from '@/shared/api/reactQueryClient'

export const useRealtimeSubscriptions = (session: Session | null) => {
  useEffect(() => {
    // subscribe to Realtime only after session exists
    if (!session) return

    // prevent multi subscriptions on re-renders (re-logs in or refreshing of session)
    if (subscriptionManager.subscriptions.length) return

    const profileUpdatesChannel: RealtimeChannel = subscribeToProfileUpdates()
    subscriptionManager.addSubscription(profileUpdatesChannel)

    const userMessagesChannel: RealtimeChannel = subscribeToUserMessages(
      session.user.id,
      (newMessage: Message) => queryClient.setQueryData<Message[] | undefined>(
        ['messages', newMessage.chat_id],
        (old = []) => [...old, newMessage]
      )
    )
    subscriptionManager.addSubscription(userMessagesChannel)

    return subscriptionManager.clearSubscriptions
  }, [session])
}