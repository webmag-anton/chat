import { useQuery } from '@tanstack/react-query'
import { getMessagesByChatId } from '@/shared/api'

export const useMessagesQuery = (chatId: string | null) => {
  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => getMessagesByChatId(chatId),
    enabled: !!chatId
  })
}
