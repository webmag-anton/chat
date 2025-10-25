import { ChatSidebarHeader } from './ChatSidebarHeader.tsx'
import { ChatSidebarBody } from './ChatSidebarBody.tsx'

export const ChatSidebar = () => {
  return (
    <div className='basis-[400px] min-w-[400px] border-r'>
      <ChatSidebarHeader />
      <ChatSidebarBody listType='profiles' />
    </div>
  )
}