import { useQuery } from '@tanstack/react-query'
import { getProfiles } from '../api/getProfiles'

export const useProfilesQuery = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles
  })
}