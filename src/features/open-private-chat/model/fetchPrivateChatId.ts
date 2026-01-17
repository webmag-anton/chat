import { getPrivateChatId, queryClient } from '@/shared/api'

export const fetchPrivateChatId = async (
  loggedInUserId: string,
  opponentId: string
) => {
  return queryClient.fetchQuery({
    queryKey: ['chat', loggedInUserId, opponentId],
    queryFn: () => getPrivateChatId(loggedInUserId, opponentId)
  })
}
