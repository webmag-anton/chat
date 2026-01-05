import type { UserProfile } from '@/entities/profile'
import { Avatar } from '@/shared/ui/avatar'
import { useAuthStore } from '@/features/authentication'
import { useMessageStore } from '@/features/send-message'
import { useChatStore, fetchPrivateChatId } from '@/entities/chat'
import { useOnlineStatusStore } from '@/features/online-status-tracker'
import { getPublicAvatarUrl } from '@/shared/lib'
import clsx from 'clsx'

interface ProfilesListItemProps {
  userData: UserProfile
}

export const ProfilesListItem = ({ userData }: ProfilesListItemProps) => {
  const {
    id: userID,
    username,
    email,
    avatar,
    avatar_version
  } = userData

  const session = useAuthStore(s => s.session)
  const loggedInUserId = session?.user.id

  const currentOpponentId = useChatStore(s => s.currentOpponentId)
  const setActivePrivateChat = useChatStore(s => s.setActivePrivateChat)
  const onlineUsers = useOnlineStatusStore(s => s.onlineUsers)
  const resetTextarea = useMessageStore(s => s.resetTextarea)
  const requestTextareaFocus = useMessageStore(s => s.requestTextareaFocus)

  const chatName = username || email

  const avatarUrl = getPublicAvatarUrl(avatar, avatar_version)

  const handleSelectUser = async () => {
    if (!loggedInUserId) return
    // Trigger the query manually — it will also be cached
    const chatId = await fetchPrivateChatId(loggedInUserId, userID)

    setActivePrivateChat(
      chatId ?? null, userID, chatName, avatar, avatar_version
    )

    if (currentOpponentId !== userID) {
      resetTextarea()
    }

    requestTextareaFocus()
  }

  const baseClasses = clsx(
    'flex pl-8 pr-3 py-2 cursor-pointer hover:bg-accent',
    {
      'bg-accent': userID === currentOpponentId
    }
  )

  const onlineStatusClasses = clsx(
    'shrink-0 inline-block w-[10px] h-[10px] rounded-full mr-2',
    onlineUsers.includes(userID ?? '') ? 'bg-green-600' : 'bg-[#b5b5b5]'
  )

  return (
    <li
      className={baseClasses}
      onClick={handleSelectUser}
    >
      <Avatar
        url={avatarUrl}
        className='mr-3'
        size={60}
        title="User's avatar"
      />

      <span className='text-lg'>
        <span className={onlineStatusClasses} />
        {chatName}
      </span>
    </li>
  )
}
