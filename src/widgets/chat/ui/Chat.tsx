import { ChatHeader } from './ChatHeader'
import { ChatWindow } from '@/entities/chat'
import { ChatFooter } from '@/features/sendMessage'

export const Chat = () => {
  return (
    <div className='grow flex flex-col'>
      <ChatHeader />
      <ChatWindow />
      <ChatFooter />
    </div>
  )
}