import { getMessagesByChatId, queryClient } from '@/shared/api'
import type { ChatMember } from '@/entities/chat'
import { useChatStore } from '@/entities/chat'
import { fetchPrivateChatId } from './fetchPrivateChatId'

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