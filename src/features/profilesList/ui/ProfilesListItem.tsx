import type { UserProfile } from '@/entities/profile'
import { Avatar } from '@/shared/ui/avatar'
import { useAuthStore } from '@/features/authentication'
import { useMessageStore } from '@/features/sendMessage'
import { useChatStore, fetchPrivateChatId } from '@/entities/chat'
import { useOnlineStatusStore } from '@/features/online-status-tracker'
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

  const { currentOpponentId, setActivePrivateChat } = useChatStore()
  const { onlineUsers } = useOnlineStatusStore()

  const chatName = username || email

  const handleListItemClick = async () => {
    if (!loggedInUserId) return
    // Trigger the query manually — it will also be cached
    const chatId = await fetchPrivateChatId(loggedInUserId, userID)

    setActivePrivateChat(chatId ?? null, userID, chatName, avatar)

    if (currentOpponentId !== userID) {
      useMessageStore.getState().resetTextarea()
    }

    useMessageStore.getState().requestTextareaFocus()
  }

  const baseClasses = clsx(
    'flex pl-8 pr-3 py-2 cursor-pointer hover:bg-accent',
    {
      'bg-accent': userID === currentOpponentId
    }
  )

  const profileClasses = clsx(
    `
      text-lg
      before:inline-block
      before:w-[10px] 
      before:h-[10px] 
      before:mr-2 
      before:rounded-full 
      before:bg-[#b5b5b5]
    `,
    {
      'before:bg-green-600': onlineUsers.includes(userID)
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

      <span className={profileClasses}>
        {chatName}
      </span>
    </li>
  )
}
