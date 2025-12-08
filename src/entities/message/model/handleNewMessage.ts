import { queryClient } from '@/shared/api/reactQueryClient'
import type { Message } from '../types'
import { type ChatWithOpponent, useChatStore } from '@/entities/chat'
import { shouldShowMessageToast } from '@/shared/lib'
import { toast } from 'sonner'

export function handleNewMessage(newMessage: Message, loggedInUserId: string) {
  const newMessageChatId = newMessage.chat_id

  if (!newMessageChatId) return

  queryClient.setQueryData<Message[]>(
    ['messages', newMessageChatId],
    (old = []) =>
      old.some((message) => message.id === newMessage.id)
        ? old
        : [...old, newMessage]
  )

  const { currentChatId } = useChatStore.getState()

  if (currentChatId !== newMessageChatId) {
    const chats = queryClient
      .getQueryData<ChatWithOpponent[]>(['chats', loggedInUserId])

    let senderName

    if (chats && chats?.length > 0) {
      const senderChat = chats.find((chat) => chat.id === newMessageChatId)
      senderName = senderChat?.opponent?.username ?? senderChat?.opponent?.email
    } else {
      toast("Hurrah, you've received the first message!")
      return
    }

    if (shouldShowMessageToast(newMessageChatId)) {
      toast(`${senderName ?? ''}`, { description: 'New message' })
    }
  }
}