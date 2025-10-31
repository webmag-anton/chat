import { useChatStore } from '@/entities/chat'

export const ChatWindow = () => {
  const { currentChatId, currentUserId } = useChatStore()

  if (!currentUserId) {
    return <div className='p-3 grow border-y'>Choose a user or group to chat with</div>
  }

  if (!currentChatId) {
    return <div className='p-3 grow border-y'>No messages here yet...</div>
  }

  return (
    <div className='grow border-y'>
      ChatBody
    </div>
  )
}