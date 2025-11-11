import { Avatar } from '@/shared/ui/avatar'
import { useChatStore } from '@/entities/chat'
import type { ChatWithOpponent } from '@/features/chatsList'
import clsx from 'clsx'

interface ChatsListItemProps {
  chatData: ChatWithOpponent
}

export const ChatsListItem = ({ chatData }: ChatsListItemProps) => {
  const {
    id: chatID,
    name,
    opponent
  } = chatData

  const { currentChatId, setActivePrivateChat } = useChatStore()

  const handleListItemClick = () => {
    setActivePrivateChat(chatID ?? null, opponent?.id ?? null, name)
  }

  const baseClasses = clsx(
    'flex pl-8 pr-3 py-2 cursor-pointer hover:bg-accent',
    {
      'bg-accent': chatID === currentChatId
    }
  )

  return (
    <li
      className={baseClasses}
      onClick={handleListItemClick}
    >
      <Avatar
        url={opponent?.avatar ?? null}
        className='mr-3'
        size={60}
        title="Chat's avatar"
      />
      {name}
    </li>
  )
}
