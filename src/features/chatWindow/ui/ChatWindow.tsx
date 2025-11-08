import { useChatStore } from '@/entities/chat'
import { useMessagesQuery } from '@/entities/message'

export const ChatWindow = () => {
  const { currentChatId, currentUserId, currentUserName } = useChatStore()
  const {
    data: messages,
    isLoading: isMessagesLoading
  } = useMessagesQuery(currentChatId)

  if (!currentUserId) {
    return <div className='p-3 grow border-y'>
      Choose a user or group to chat with
    </div>
  }
  if (!currentChatId) {
    return <div className='p-3 grow border-y'>No messages here yet...</div>
  }
  if (isMessagesLoading) return <div>Loading...</div>

  return (
    <div className='grow border-y p-3'>
      <ul>
        {messages?.map((m) => (
          <li key={m.id}>
            <b>
              {m.sender_id === currentUserId
                ? `${currentUserName}: `
                : 'I: '
              }
            </b>
            {m.content}
          </li>
        ))}
      </ul>
    </div>
  )
}