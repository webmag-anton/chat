import { Fragment } from 'react'
import { useChatStore } from '@/entities/chat'
import { useMessagesQuery } from '@/entities/message'
import { ChatMessage } from '@/entities/message'
import { MessageDate } from './MessageDate'
import clsx from 'clsx'

export const ChatWindow = () => {
  const {
    currentChatId,
    currentUserId,
    currentUserName,
    currentUserAvatar
  } = useChatStore()
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

  let messageDate: string = ''

  return (
    <div className='grow px-5 py-3 border-y overflow-y-auto overflow-x-hidden'>
      <ul className='flex flex-col max-w-[580px]'>
        {messages?.map((m, i) => {
          const isOpponent = m.sender_id === currentUserId
          const messageCreationDate = m.created_at

          const next = messages[i + 1]
          const prev = messages[i - 1]

          const isLastInSeries = !next || next.sender_id !== m.sender_id

          const diffMs = prev
            ? new Date(messageCreationDate).getTime() - new Date(prev.created_at).getTime()
            : 0
          const is15MinutesPast = diffMs > 1000 * 60 * 15

          const isShowAvatar = isLastInSeries || is15MinutesPast

          const messageBaseClasses = clsx(
            'flex self-start max-w-full mb-1 text-lg',
            {
              'mb-3': isShowAvatar
            }
          )

          const messageContentBaseClasses = clsx(
            'min-w-0 p-[10px] rounded-2xl bg-[#edf0f8] break-words ' +
            'whitespace-pre-line',
            {
              'bg-accent': isOpponent,
              'rounded-bl-none': isShowAvatar
            }
          )

          const messageDateObj = new Date(messageCreationDate)

          const dateString = messageDateObj.toLocaleDateString('en-GB')
          const isShowNewDate = !messageDate || messageDate !== dateString
          messageDate = dateString

          const normalisedDate = messageDateObj.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
          })

          const minutes = messageDateObj.getMinutes()
          const messageTime =
            `${messageDateObj.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`

          return (
            <Fragment key={m.id}>
              {isShowNewDate && <MessageDate date={normalisedDate} />}

              <ChatMessage
                className={messageBaseClasses}
                messageContentClassName={messageContentBaseClasses}
                isShowAvatar={isShowAvatar}
                isOpponent={isOpponent}
                avatar={currentUserAvatar}
                userName={currentUserName}
                message={m}
                messageTime={messageTime}
              />
            </Fragment>
          )
        })}
      </ul>
    </div>
  )
}