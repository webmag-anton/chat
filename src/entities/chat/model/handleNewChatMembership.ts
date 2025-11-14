import { getMessagesByChatId } from '@/entities/message'
import { queryClient } from '@/shared/api/reactQueryClient'
import type { ChatMember } from '../types'
import type { ChatState } from './chatStore'

export async function handleNewChatMembership(
  newChatMember: ChatMember | {},
  chatStore: ChatState
) {
  if (
    !newChatMember || !('chat_id' in newChatMember) || !newChatMember.chat_id
  ) return

  const chatId = newChatMember.chat_id
  const { updateCurrentChatId } = chatStore

  updateCurrentChatId(chatId)

  const firstChatMessage = await getMessagesByChatId(chatId)
  queryClient.setQueryData(['messages', chatId], firstChatMessage)
}