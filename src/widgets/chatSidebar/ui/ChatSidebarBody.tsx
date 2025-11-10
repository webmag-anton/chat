import { ProfilesList } from '@/features/profilesList'
import { useChatSidebarStore } from '../model/chatSidebarStore'
import { ChatsList } from '@/features/chatsList'

export const ChatSidebarBody = () => {
  const { listType } = useChatSidebarStore()

  const title = listType === 'users' ? 'all users' : 'my chats'

  return (
    <div
      style={{ '--chat-sidebar-title': `"${title}"` } as React.CSSProperties}
      className={`
        relative
        h-[calc(100vh-var(--headers-height))]
        border-t
        before:absolute
        before:top-0
        before:bottom-0
        before:content-[var(--chat-sidebar-title)]
        before:pl-[2px]
        before:text-[18px]
        before:font-medium
        before:italic
        before:text-center
        before:uppercase
        before:tracking-[14px]
        before:[writing-mode:vertical-lr]
        before:pointer-events-none
      `}
    >
      {listType === 'users' ? <ProfilesList /> : <ChatsList />}
    </div>
  )
}