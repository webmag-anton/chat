import { useEffect } from 'react'
import type { RealtimeChannel, Session } from '@supabase/supabase-js'
import { subscriptionManager } from '@/shared/lib/subscriptionManager'
import { subscribeToProfileUpdates } from '@/features/profilesList'
import { type Message, subscribeToUserMessages } from '@/entities/message'
import { queryClient } from '@/shared/api/reactQueryClient'
import { subscribeToNewChatMembership } from '@/entities/chat'
import type { ChatMember } from '@/entities/chat'
import { getMessagesByChatId } from '@/entities/message'

export const useRealtimeSubscriptions = (session: Session | null) => {
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
      (newMessage: Message) => queryClient.setQueryData<Message[] | undefined>(
        ['messages', newMessage.chat_id],
        (old = []) => [...old, newMessage]
      )
    )
    subscriptionManager.addSubscription(userMessagesChannel)

    const newChatMembershipsChannel: RealtimeChannel
      = subscribeToNewChatMembership(
          loggedInUserId,
      async (chatMember: ChatMember) => {
            const chatId = chatMember.chat_id
            if (!chatId) return

            const messages = await getMessagesByChatId(chatId)
            queryClient.setQueryData(['messages', chatId], messages)
          }
        )
    subscriptionManager.addSubscription(newChatMembershipsChannel)

    return subscriptionManager.clearSubscriptions
  }, [session])
}