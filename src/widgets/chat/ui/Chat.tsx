import { ChatHeader } from './ChatHeader'
import { ChatWindow } from './ChatWindow.tsx'
import { ChatFooter } from './ChatFooter'

export const Chat = () => {
  return (
    <div className='grow flex flex-col'>
      <ChatHeader />
      <ChatWindow />
      <ChatFooter />
    </div>
  )
}