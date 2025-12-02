import { getPrivateChatId } from '../api/getPrivateChatId'
import { queryClient } from '@/shared/api/reactQueryClient'

export const fetchPrivateChatId = async (
  loggedInUserId: string,
  opponentId: string
) => {
  return queryClient.fetchQuery({
    queryKey: ['chat', loggedInUserId, opponentId],
    queryFn: () => getPrivateChatId(loggedInUserId, opponentId)
  })
}
