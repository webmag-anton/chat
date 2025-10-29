import type { UserProfile } from '../types'
import { Avatar } from '@/shared/ui/avatar'
import { useChatQuery } from '@/entities/chat/model/useChatQuery.ts'
import { useAuthStore } from '@/features/authentication'

interface ProfilesListItemProps {
  userData: UserProfile
}

export const ProfilesListItem = ({ userData }: ProfilesListItemProps) => {
  const {
    id: itemID,
    username,
    email,
    avatar
  } = userData

  const { session } = useAuthStore()

  const currentUserId = session?.user.id
  const { data: chatId } = useChatQuery(currentUserId, itemID)

  const handleListItemClick = () => {
    if (chatId) {
      console.log('Open existing chat: ', chatId)
    } else {
      console.log('No chat found between these users: ', `1: ${currentUserId}`, `2: ${itemID}`)
    }
  }

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
      onClick={handleListItemClick}
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
