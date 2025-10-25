import { ProfilesList } from '@/features/profiles'

interface ChatSidebarBodyProps {
  listType: 'profiles' | 'chats'
}

export const ChatSidebarBody = (props: ChatSidebarBodyProps) => {
  const { listType} = props

  const title = listType === 'profiles' ? 'all users' : 'chats'

  return (
    <div
      style={{ '--before-content': `"${title}"` } as React.CSSProperties}
      className={`
        relative
        h-[calc(100vh-50px)]
        before:absolute
        before:top-0
        before:bottom-0
        before:content-[var(--before-content)]
        before:pl-[2px]
        before:text-[18px]
        before:text-center
        before:uppercase
        before:tracking-[14px]
        before:[writing-mode:vertical-lr]
      `}
    >
      <ProfilesList />
    </div>
  )
}