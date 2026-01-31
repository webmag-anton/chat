import { Avatar } from '@/shared/ui/avatar'
import { useChatStore, type ChatWithOpponent } from '@/entities/chat'
import { useMessageStore } from '@/features/send-message'
import { useOnlineStatusStore } from '@/features/online-status-tracker'
import { useMessagesQuery } from '@/features/load-chat-messages'
import { useTypingStore, TypingIndicator } from '@/features/typing-tracker'
import { getMessageDateFormat, getPublicAvatarUrl } from '@/shared/lib'
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

  const currentChatId = useChatStore(s => s.currentChatId)
  const setActivePrivateChat = useChatStore(s => s.setActivePrivateChat)
  const onlineUsers = useOnlineStatusStore(s => s.onlineUsers)
  const hasTyping = useTypingStore(s => s.hasTypingInChat(chatID))
  const resetTextarea = useMessageStore(s => s.resetTextarea)
  const requestTextareaFocus = useMessageStore(s => s.requestTextareaFocus)

  const { data: chatMessages } = useMessagesQuery(chatID)

  const lastMessage = chatMessages
    ? chatMessages[chatMessages.length - 1]
    : undefined

  const lastMessageContent = lastMessage
    ? JSON.parse(lastMessage.content)
    : null

  const firstRowInLastMessage = lastMessageContent
    ? lastMessageContent.split('\n')[0]
    : null

  const lastMessageCreation = lastMessage ? lastMessage.created_at : null

  const lastMessageDate = getMessageDateFormat(lastMessageCreation)

  const avatarUrl
    = getPublicAvatarUrl(opponent?.avatar, opponent?.avatar_version)

  const handleSelectChat = () => {
    setActivePrivateChat(
      chatID ?? null,
      opponentId ?? null,
      opponentName ?? null,
      opponent?.avatar ?? null,
      opponent?.avatar_version ?? null
    )

    if (chatID !== currentChatId) {
      resetTextarea()
    }

    requestTextareaFocus()
  }

  const baseClasses = clsx(
    'flex pl-8 pr-3 py-2 transition cursor-pointer hover:bg-accent',
    {
      'bg-accent': chatID === currentChatId
    }
  )

  const onlineStatusClasses = clsx(
    'shrink-0 inline-block w-[10px] h-[10px] rounded-full mr-2',
    onlineUsers.includes(opponentId ?? '') ? 'bg-green-600' : 'bg-[#b5b5b5]'
  )

  return (
    <li
      className={baseClasses}
      onClick={handleSelectChat}
    >
      <Avatar
        url={avatarUrl}
        className='shrink-0 mr-3'
        size={60}
        title="Chat's avatar"
      />

      <div
        className='
          grow
          flex
          flex-col
          justify-between
          min-w-0
          max-w-[calc(100%-60px)]
          py-[2px]
        '
      >
        <div className='flex items-center'>
          <span className={onlineStatusClasses} />
          <span className='grow truncate pr-[20px] text-lg'>
            {opponentName}
          </span>
          <span className='shrink-0 whitespace-nowrap text-sm'>
            {lastMessageDate}
          </span>
        </div>

        {hasTyping ? (
          <TypingIndicator chatId={chatID}/>
        ) : (
          <span className='truncate'>{firstRowInLastMessage}</span>
        )}
      </div>
    </li>
  )
}
