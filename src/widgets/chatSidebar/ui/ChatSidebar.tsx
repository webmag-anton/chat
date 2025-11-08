import { ChatSidebarHeader } from './ChatSidebarHeader'
import { ChatSidebarBody } from './ChatSidebarBody'

export const ChatSidebar = () => {
  return (
    <div className='basis-[400px] min-w-[400px] border-r'>
      <ChatSidebarHeader />
      <ChatSidebarBody />
    </div>
  )
}