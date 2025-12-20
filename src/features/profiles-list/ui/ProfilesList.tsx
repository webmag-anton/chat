import { ProfilesListItem } from './ProfilesListItem'
import { useAuthStore } from '@/features/authentication'
import { useProfilesQuery } from '../model/useProfilesQuery'

export const ProfilesList = () => {
  const { data, isLoading, error } = useProfilesQuery()
  const { session } = useAuthStore()

  if (isLoading) return <div className='h-full'>Loading...</div>
  if (error) return <div className='h-full'>Error loading profiles</div>

  return (
    <div>
      {!data || data.length === 0
        ? <div>No registered users yet.</div>
        : <ul>
            {data?.map((user) => {
              if (session?.user?.id === user.id) return null
              return <ProfilesListItem userData={user} key={user.id} />
            })}
          </ul>
      }
    </div>
  )
}
