import { getPrivateChatId } from '../api/getPrivateChatId'
import { queryClient } from '@/shared/api/reactQueryClient'

export const fetchPrivateChatId = async (
  loggedInUserId: string,
  otherUserId: string
) => {
  return queryClient.fetchQuery({
    queryKey: ['chats', loggedInUserId, otherUserId],
    queryFn: () => getPrivateChatId(loggedInUserId, otherUserId),
    staleTime: 1000 * 60 * 5 // 5 minutes cache freshness
  })
}
