import { useQuery } from '@tanstack/react-query'
import { getLoggedInUserProfile } from '../api/getLoggedInUserProfile'

export const useLoggedInUserProfile = (loggedInUserId: string) => {
  return useQuery({
    queryKey: ['profile', 'logged_in_user'],
    queryFn: () => getLoggedInUserProfile(loggedInUserId),
    enabled: !!loggedInUserId
  })
}