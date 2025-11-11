import type { UserProfile } from '../types'
import { Avatar } from '@/shared/ui/avatar'
import { useAuthStore } from '@/features/authentication'
import { useChatStore, fetchPrivateChatId } from '@/entities/chat'
import clsx from 'clsx'

interface ProfilesListItemProps {
  userData: UserProfile
}

export const ProfilesListItem = ({ userData }: ProfilesListItemProps) => {
  const {
    id: userID,
    username,
    email,
    avatar
  } = userData

  const { session } = useAuthStore()
  const loggedInUserId = session?.user.id

  const { currentUserId, setActivePrivateChat } = useChatStore()

  const chatName = username || email

  const handleListItemClick = async () => {
    if (!loggedInUserId) return
    // Trigger the query manually — it will also be cached
    const chatId = await fetchPrivateChatId(loggedInUserId, userID)

    setActivePrivateChat(chatId ?? null, userID, chatName)
  }

  const baseClasses = clsx(
    'flex pl-8 pr-3 py-2 cursor-pointer hover:bg-accent',
    {
      'bg-accent': userID === currentUserId
    }
  )

  return (
    <li
      className={baseClasses}
      onClick={handleListItemClick}
    >
      <Avatar
        url={avatar}
        className='mr-3'
        size={60}
        title="User's avatar"
      />

      {chatName}
    </li>
  )
}
