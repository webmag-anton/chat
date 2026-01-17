import { ProfilesList } from '@/features/load-profiles'
import { ChatsList } from '@/features/load-chats'
import { useChatSidebar } from '@/features/load-chat-sidebar'

export const ChatSidebarBody = () => {
  const { listType, isInitialized } = useChatSidebar()

  if (!isInitialized) {
    return null
  }

  const title = listType === 'users' ? 'all users' : 'my chats'

  return (
    <div
      style={{ '--chat-sidebar-title': `"${title}"` } as React.CSSProperties}
      className={`
        relative
        grow
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
        before:text-main
        before:[writing-mode:vertical-lr]
        before:pointer-events-none
      `}
    >
      {listType === 'users' ? <ProfilesList /> : <ChatsList />}
    </div>
  )
}