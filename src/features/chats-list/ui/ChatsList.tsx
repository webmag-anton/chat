import { ChatsListItem } from './ChatsListItem'
import { useChatsQuery } from '../model/useChatsQuery'
import { useAuthStore } from '@/features/authentication'

export const ChatsList = () => {
  const { session } = useAuthStore()
  const {
    data: chatsWithOpponents,
    isLoading,
    error
  } = useChatsQuery(session?.user?.id ?? '')

  if (isLoading) {
    return (
      <div className='w-fit mx-auto mt-8 p-2 rounded-2xl bg-bg-message'>
        Loading...
      </div>
    )
  }
  if (error) {
    return (
      <div className='w-fit mx-auto mt-8 p-2 rounded-2xl bg-bg-message'>
        Error loading chats
      </div>
    )
  }

  return (
    <div>
      {!chatsWithOpponents || chatsWithOpponents.length === 0
        ? <div className='w-fit mx-auto mt-8 p-2 rounded-2xl bg-bg-message'>
            No chats yet, message someone!
          </div>
        : <ul>
            {chatsWithOpponents.map((chat) => {
              return <ChatsListItem chatData={chat} key={chat.id} />
            })}
          </ul>
      }
    </div>
  )
}
