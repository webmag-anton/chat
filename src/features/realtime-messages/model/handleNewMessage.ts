import { queryClient } from '@/shared/api'
import type { Message } from '@/entities/message/types'
import { type ChatWithOpponent, useChatStore } from '@/entities/chat'
import { shouldShowMessageToast } from '@/shared/lib'
import { useTypingStore } from '@/features/typing-tracker'
import { toast } from 'sonner'

export function handleNewMessage(newMessage: Message, loggedInUserId: string) {
  const newMessageChatId = newMessage.chat_id
  const newMessageSenderId = newMessage.sender_id

  if (!newMessageChatId) return

  const { currentChatId } = useChatStore.getState()
  const { clearTyping } = useTypingStore.getState()

  queryClient.setQueryData<Message[]>(
    ['messages', newMessageChatId],
    (old = []) =>
      old.some((message) => message.id === newMessage.id)
        ? old
        : [...old, newMessage]
  )

  queryClient.invalidateQueries({
    queryKey: ['chats', loggedInUserId]
  })

  if (newMessageSenderId) {
    clearTyping(newMessageChatId, newMessageSenderId)
  }

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