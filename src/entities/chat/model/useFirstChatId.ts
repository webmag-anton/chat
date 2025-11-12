import { useQuery } from '@tanstack/react-query'
import { getFirstChatId } from '../api/getFirstChatId'

export const useFirstChatId = (loggedInUserId: string ) => {
  return useQuery({
    queryKey: ['first_chat', loggedInUserId],
    queryFn: getFirstChatId,
    enabled: !!loggedInUserId
  })
}
