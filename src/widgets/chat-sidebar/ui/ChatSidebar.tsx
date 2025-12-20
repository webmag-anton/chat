import { ChatSidebarHeader } from './ChatSidebarHeader'
import { ChatSidebarBody } from './ChatSidebarBody'

export const ChatSidebar = () => {
  return (
    <div
      className='
        flex
        flex-col
        basis-[400px]
        shrink-0
        max-w-[400px]
        border-r
      '
    >
      <ChatSidebarHeader />
      <ChatSidebarBody />
    </div>
  )
}