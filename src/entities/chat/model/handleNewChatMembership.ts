import { getMessagesByChatId } from '@/entities/message'
import { queryClient } from '@/shared/api/reactQueryClient'
import type { ChatMember } from '../types'
import { useChatStore } from './chatStore'
import { fetchPrivateChatId } from '@/entities/chat'

export async function handleNewChatMembership( newChatMember: ChatMember ) {
  const newChatId = newChatMember.chat_id
  const { currentOpponentId, updateCurrentChatId } = useChatStore.getState()

  if (currentOpponentId) {
    const chatId =
      await fetchPrivateChatId(newChatMember.user_id, currentOpponentId)

    if (newChatId === chatId) {
      updateCurrentChatId(newChatId)
    }
  }

  const firstChatMessage = await getMessagesByChatId(newChatId)
  queryClient.setQueryData(['messages', newChatId], firstChatMessage)
}