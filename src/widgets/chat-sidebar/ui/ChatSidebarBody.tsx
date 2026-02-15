import { ProfilesList } from '@/features/load-profiles'
import { ChatsList } from '@/features/load-chats'
import { useChatSidebar } from '@/features/load-chat-sidebar'
import { useAuthStore } from '@/features/authentication'
import { DemoProfilesList } from '@/entities/demo-user'

export const ChatSidebarBody = () => {
  const { listType, isInitialized } = useChatSidebar()
  const session = useAuthStore(s => s.session)

  if (session && !isInitialized) {
    return null
  }

  let title
  if (session) {
    title = listType === 'users' ? 'all users' : 'my chats'
  } else {
    title = 'users'
  }

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
      {session
        ? listType === 'users' ? <ProfilesList /> : <ChatsList />
        : <DemoProfilesList />
      }
    </div>
  )
}