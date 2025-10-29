import { ChatHeader } from './ChatHeader'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'

export const Chat = () => {
  return (
    <div className='grow flex flex-col'>
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  )
}