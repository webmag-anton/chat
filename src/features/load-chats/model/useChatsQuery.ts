import { useQuery } from '@tanstack/react-query'
import { getChats } from '../api/getChats'

export const useChatsQuery = (loggedInUserId: string) => {
  return useQuery({
    queryKey: ['chats', loggedInUserId],
    queryFn: () => getChats(loggedInUserId),
    enabled: !!loggedInUserId
  })
}