import { useQuery } from '@tanstack/react-query'
import { getPrivateChatId } from '../api/getPrivateChatId'

export const useChatQuery = (currentUserId?: string, otherUserId?: string) => {
  return useQuery({
    queryKey: ['chats', currentUserId, otherUserId],
    queryFn: () => getPrivateChatId(currentUserId!, otherUserId!),
    enabled: !!currentUserId && !!otherUserId // only run if both IDs exist
  })
}
