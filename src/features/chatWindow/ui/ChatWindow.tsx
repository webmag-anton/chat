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
  if (isMessagesLoading) return <div className='grow p-3'>Loading...</div>

  return (
    <div className='grow p-3 border-y overflow-y-auto overflow-x-hidden'>
      <ul className='flex flex-col max-w-[580px]'>
        {messages?.map((m) => (
          <li
            key={m.id}
            className='self-start max-w-full mb-2 p-2 border rounded-2xl'
          >
            <span className='font-bold'>
              {m.sender_id === currentUserId ? `${currentUserName}: ` : 'I: '}
            </span>

            <span className='block break-words'>
              {m.content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}