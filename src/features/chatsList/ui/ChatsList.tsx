import { ChatsListItem } from '@/entities/chat'
import { useAuthStore } from '@/features/authentication'
import { useChatsQuery } from '../model/useChatsQuery'

export const ChatsList = () => {
  const { session } = useAuthStore()
  const {
    data: chatsWithOpponents,
    isLoading,
    error
  } = useChatsQuery(session?.user?.id ?? '')

  if (isLoading) return <div className='h-full p-3'>Loading...</div>
  if (error) return <div className='h-full p-3'>Error loading chats</div>

  return (
    <div>
      {!chatsWithOpponents || chatsWithOpponents.length === 0
        ? <div className='p-3'>No chats yet</div>
        : <ul>
            {chatsWithOpponents.map((chat) => {
              return <ChatsListItem chatData={chat} key={chat.id}/>
            })}
          </ul>
      }
    </div>
  )
}
