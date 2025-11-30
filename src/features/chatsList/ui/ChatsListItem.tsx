import { Avatar } from '@/shared/ui/avatar'
import { useChatStore, type ChatWithOpponent } from '@/entities/chat'
import { useMessageStore } from '@/features/sendMessage'
import { useOnlineStatusStore } from '@/features/online-status-tracker'
import clsx from 'clsx'

interface ChatsListItemProps {
  chatData: ChatWithOpponent
}

export const ChatsListItem = ({ chatData }: ChatsListItemProps) => {
  const {
    id: chatID,
    opponent
  } = chatData

  const opponentName = opponent?.username || opponent?.email
  const opponentId = opponent?.id

  const { currentChatId, setActivePrivateChat } = useChatStore()
  const { resetTextarea } = useMessageStore()
  const { onlineUsers } = useOnlineStatusStore()

  const handleListItemClick = () => {
    setActivePrivateChat(
      chatID ?? null,
      opponentId ?? null,
      opponentName ?? null,
      opponent?.avatar ?? null
    )

    if (chatID !== currentChatId) {
      resetTextarea()
    }
  }

  const baseClasses = clsx(
    'flex pl-8 pr-3 py-2 cursor-pointer hover:bg-accent',
    {
      'bg-accent': chatID === currentChatId
    }
  )

  const chatInfoClasses = clsx(
    `
      text-lg
      before:inline-block
      before:w-[10px] 
      before:h-[10px] 
      before:mr-2 
      before:rounded-full 
      before:bg-[#b5b5b5]
    `,
    {
      'before:bg-green-600': onlineUsers.includes(opponentId ?? '')
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

      <span className={chatInfoClasses}>
        {opponentName}
      </span>
    </li>
  )
}
