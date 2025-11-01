import { getPrivateChatId } from '../api/getPrivateChatId'
import { queryClient } from '@/shared/api/reactQueryClient'

export const fetchPrivateChatId = async (
  loggedUserId: string,
  otherUserId: string
) => {
  return queryClient.fetchQuery({
    queryKey: ['chats', loggedUserId, otherUserId],
    queryFn: () => getPrivateChatId(loggedUserId, otherUserId),
    staleTime: 1000 * 60 * 5 // 5 minutes cache freshness
  })
}
