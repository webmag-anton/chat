import { ChatHeader } from './ChatHeader'
import { ChatWindow } from '@/widgets/chatWindow'
import { ChatFooter } from '@/features/sendMessage'

export const Chat = () => {
  return (
    <div
      className='
        grow
        flex
        flex-col
        w-[calc(100vw-400px)]
        min-w-[400px]
        max-w-[calc(80rem-400px)]
      '
    >
      <ChatHeader />
      <ChatWindow />
      <ChatFooter />
    </div>
  )
}