import { ChatSidebarHeader } from './ChatSidebarHeader'
import { ChatSidebarBody } from './ChatSidebarBody'

export const ChatSidebar = () => {
  return (
    <div
      className='
        flex
        flex-col
        basis-[var(--chat-sidebar-width)]
        shrink-0
        max-w-[var(--chat-sidebar-width)]
        bg-bg-main
      '
    >
      <ChatSidebarHeader />
      <ChatSidebarBody />
    </div>
  )
}