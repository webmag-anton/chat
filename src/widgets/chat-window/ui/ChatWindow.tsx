import { Fragment } from 'react'
import { useChatStore } from '@/entities/chat'
import { ChatMessage, MessageDate } from '@/entities/message'
import { useMessagesQuery } from '@/features/load-chat-messages'
import { useProcessedMessages } from '@/features/load-chat-messages'
import { useLoggedInUserProfile } from '@/features/profile-edit'
import { useAuthStore } from '@/features/authentication'
import { getPublicAvatarUrl } from '@/shared/lib'
import clsx from 'clsx'

export const ChatWindow = () => {
  const chat = useChatStore()
  const session = useAuthStore(s => s.session)

  const { data: messages, isLoading: isMessagesLoading } =
    useMessagesQuery(chat.currentChatId)

  const processedMessages = useProcessedMessages(
    messages,
    chat.currentOpponentId
  )

  const { data: me } = useLoggedInUserProfile(
    session?.user?.id ?? ''
  )

  if (!chat.currentOpponentId) {
    return (
      <div className='grow grid place-content-center'>
        <span className='p-2 rounded-2xl bg-bg-message'>
          Choose a user or group to chat with
        </span>
      </div>
    )
  }

  if (!chat.currentChatId) {
    return (
      <div className='grow grid place-content-center'>
        <span className='p-2 rounded-2xl bg-bg-message'>
          No messages here yet...
        </span>
      </div>
    )
  }

  if (isMessagesLoading) {
    return (
      <div className='grow grid place-content-center'>
        <span className='p-2 rounded-2xl bg-bg-message'>
          Loading...
        </span>
      </div>
    )
  }

  return (
    <div className='grow px-5 py-3 overflow-y-auto'>
      <ul className='flex flex-col max-w-[580px]'>
        {processedMessages.map(message => {
          const avatar = getPublicAvatarUrl(
            message.isOpponent
              ? chat.currentOpponentAvatar
              : me?.avatar,
            message.isOpponent
              ? chat.currentOpponentAvatarVersion
              : me?.avatar_version
          )

          const messageClasses = clsx(
            'flex self-start max-w-full mb-1 text-lg',
            { 'mb-3': message.isShowAvatar }
          )

          const contentClasses = clsx(
            'min-w-[95px] p-[10px] rounded-2xl whitespace-pre-line',
            message.isOpponent ? 'bg-accent' : 'bg-bg-message',
            { 'rounded-bl-none': message.isShowAvatar }
          )

          return (
            <Fragment key={message.message.id}>
              {message.isShowNewDate && (
                <MessageDate date={message.dateLabel!} />
              )}

              <ChatMessage
                className={messageClasses}
                messageContentClassName={contentClasses}
                isShowAvatar={message.isShowAvatar}
                isOpponent={message.isOpponent}
                avatar={avatar}
                userName={chat.currentOpponentName}
                message={message.message}
                messageTime={message.timeLabel}
              />
            </Fragment>
          )
        })}
      </ul>
    </div>
  )
}