import { ProfilesListItem } from '@/entities/profile'
import { useAuthStore } from '@/features/authentication'
import { useProfilesQuery } from '../model/useProfilesQuery'

export const ProfilesList = () => {
  const { data, isLoading, error } = useProfilesQuery()
  const { session } = useAuthStore()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading profiles</div>

  return (
    <div className='h-full'>
      {!data || data.length === 0
        ? <div>No registered users yet.</div>
        : <ul className='grow overflow-y-auto'>
            {data?.map((user) => {
              if (session?.user?.id === user.id) return null
              return <ProfilesListItem userData={user} key={user.id}/>
            })}
          </ul>
      }
    </div>
  )
}
