import type { UserProfile } from '../types'
import { Avatar } from '@/shared/ui/avatar'

interface UserProps {
  userData: UserProfile
}

export const User = ({ userData }: UserProps) => {
  const {
    username,
    email,
    avatar
  } = userData

  return (
    <li
      className='
        flex
        pl-8
        pr-3
        py-2
        cursor-pointer
        hover:bg-accent
      '
    >
      <Avatar
        url={avatar}
        className='mr-3'
        size={60}
        title="User's avatar"
      />

      {username || email}
    </li>
  )
}
