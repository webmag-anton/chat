import { User } from '@/entities/user'
import { useProfilesQuery } from '../model/useProfilesQuery'

export const ProfilesList = () => {
  const { data, isLoading, error } = useProfilesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading profiles</div>

  return (
    <ul>
      {data?.map((user) => (
        <User userData={user} key={user.id} />
      ))}
    </ul>
  )
}
