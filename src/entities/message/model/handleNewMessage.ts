import { queryClient } from '@/shared/api/reactQueryClient'
import type { Message } from '../types'

export function handleNewMessage(newMessage: Message) {
  queryClient.setQueryData<Message[]>(
    ['messages', newMessage.chat_id],
    (old = []) =>
      old.some((message) => message.id === newMessage.id)
        ? old
        : [...old, newMessage]
  )
}