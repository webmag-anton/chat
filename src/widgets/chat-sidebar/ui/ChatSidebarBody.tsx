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
        grow
        overflow-y-auto
        before:fixed
        before:top-[calc(46%+var(--headers-height))]
        before:-translate-y-1/2
        before:content-[var(--chat-sidebar-title)]
        before:min-h-[240px]
        before:pl-[2px]
        before:text-[16px]
        before:font-medium
        before:italic
        before:text-center
        before:uppercase
        before:tracking-[14px]
        before:text-main
        before:[writing-mode:vertical-lr]
        before:break-all
        before:pointer-events-none
        md:before:text-[18px]
      `}
    >
      {listType === 'users' ? <ProfilesList /> : <ChatsList />}
    </div>
  )
}