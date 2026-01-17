import { ProfilesListItem } from './ProfilesListItem'
import { useAuthStore } from '@/features/authentication'
import { useProfilesQuery } from '../model/useProfilesQuery'

export const ProfilesList = () => {
  const { data, isLoading, error } = useProfilesQuery()
  const session = useAuthStore(s => s.session)

  if (isLoading) {
    return (
      <div className='w-fit mx-auto mt-8 p-2 rounded-2xl bg-bg-message'>
        Loading...
      </div>
    )
  }
  if (error) {
    return (
      <div className='w-fit mx-auto mt-8 p-2 rounded-2xl bg-bg-message'>
        Error loading profiles
      </div>
    )
  }

  return (
    <div>
      {!data || data.length === 0
        ? <div className='w-fit mx-auto mt-8 p-2 rounded-2xl bg-bg-message'>
            No registered users yet
          </div>
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