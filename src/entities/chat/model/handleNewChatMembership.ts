import { getMessagesByChatId } from '@/entities/message'
import { queryClient } from '@/shared/api/reactQueryClient'
import type { ChatMember } from '../types'
import { useChatStore } from './chatStore'
import { fetchPrivateChatId } from '@/entities/chat'

export async function handleNewChatMembership(
  newChatMember: ChatMember | {}
) {
  if (
    !newChatMember || !('chat_id' in newChatMember) || !newChatMember.chat_id
  ) return

  const newChatId = newChatMember.chat_id
  const { currentUserId, updateCurrentChatId } = useChatStore.getState()

  if (currentUserId) {
    const chatId = await fetchPrivateChatId(newChatMember.user_id, currentUserId)

    if (newChatId === chatId) {
      updateCurrentChatId(newChatId)
    }
  }

  const firstChatMessage = await getMessagesByChatId(newChatId)
  queryClient.setQueryData(['messages', newChatId], firstChatMessage)
}