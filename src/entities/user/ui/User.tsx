import type { UserProfile } from '../types'

interface UserProps {
  userData: UserProfile
}

export const User = ({ userData }: UserProps) => {
  return (
    <li>{userData.username || userData.email}</li>
  )
}
