import { useEffect } from 'react'
import { ProfilesList } from '@/features/profiles-list'
import { useChatSidebarStore } from '../model/chatSidebarStore'
import { ChatsList } from '@/features/chats-list'
import { useFirstChatId } from '@/entities/chat'
import { useAuthStore } from '@/features/authentication'

export const ChatSidebarBody = () => {
  const { listType, setListType } = useChatSidebarStore()
  const { session } = useAuthStore()
  const loggedInUserId = session?.user?.id ?? ''
  const { data: firstChatId } = useFirstChatId(loggedInUserId)

  useEffect(() => {
    if (firstChatId !== undefined) {
      setListType(firstChatId ? 'chats' : 'users')
    }
  }, [firstChatId, setListType])

  const title = listType === 'users' ? 'all users' : 'my chats'

  return (
    <div
      style={{ '--chat-sidebar-title': `"${title}"` } as React.CSSProperties}
      className={`
        relative
        grow
        border-t
        overflow-y-auto
        before:fixed
        before:top-1/2
        before:-translate-y-1/2
        before:content-[var(--chat-sidebar-title)]
        before:pl-[2px]
        before:text-[18px]
        before:font-medium
        before:italic
        before:text-center
        before:uppercase
        before:tracking-[14px]
        before:text-[#1d0bb4]
        before:[writing-mode:vertical-lr]
        before:pointer-events-none
      `}
    >
      {listType === 'users' ? <ProfilesList /> : <ChatsList />}
    </div>
  )
}