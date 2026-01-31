import { ChatSidebarHeader } from './ChatSidebarHeader'
import { ChatSidebarBody } from './ChatSidebarBody'
import { useChatStore } from '@/entities/chat'
import clsx from 'clsx'

export const ChatSidebar = () => {
  const currentOpponentId = useChatStore(s => s.currentOpponentId)

  const baseClasses = clsx(
    'flex flex-col shrink-0 absolute inset-0 bg-bg-main md:static',
    'transform transition-transform duration-250 ease-in-out',
    'md:basis-[var(--chat-sidebar-small-width)]',
    'md:max-w-[var(--chat-sidebar-small-width)]',
    'lg:basis-[var(--chat-sidebar-big-width)]',
    'lg:max-w-[var(--chat-sidebar-big-width)]',
    'md:transform-none md:translate-none',
    {
      'translate-x-[-50px]': currentOpponentId,
      'translate-x-0': !currentOpponentId
    }
  )

  return (
    <div className={baseClasses}>
      <ChatSidebarHeader />
      <ChatSidebarBody />
    </div>
  )
}