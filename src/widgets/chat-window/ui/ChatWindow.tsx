import { Fragment } from 'react'
import { useChatStore } from '@/entities/chat'
import { useMessagesQuery } from '@/entities/message'
import { ChatMessage } from '@/entities/message'
import { MessageDate } from './MessageDate'
import { getPublicAvatarUrl } from '@/shared/lib'
import { useLoggedInUserProfile } from '@/features/profile-edit'
import { useAuthStore } from '@/features/authentication'
import clsx from 'clsx'

export const ChatWindow = () => {
  const currentChatId = useChatStore(s => s.currentChatId)
  const currentOpponentId = useChatStore(s => s.currentOpponentId)
  const currentOpponentName = useChatStore(s => s.currentOpponentName)
  const currentOpponentAvatar = useChatStore(s => s.currentOpponentAvatar)
  const currentOpponentAvatarVersion
    = useChatStore(s => s.currentOpponentAvatarVersion)

  const session = useAuthStore(s => s.session)

  const {
    data: messages,
    isLoading: isMessagesLoading
  } = useMessagesQuery(currentChatId)
  const { data: loggedInUserData }
    = useLoggedInUserProfile(session?.user?.id ?? '')

  if (!currentOpponentId) {
    return (
      <div className='grow text-center place-content-center'>
        <span className='p-2 rounded-2xl bg-bg-message'>
          Choose a user or group to chat with
        </span>
      </div>
    )
  }
  if (!currentChatId) {
    return (
      <div className='grow text-center place-content-center'>
        <span className='p-2 rounded-2xl bg-bg-message'>
          No messages here yet...
        </span>
      </div>
    )
  }
  if (isMessagesLoading) {
    return (
      <div className='grow text-center place-content-center'>
        <span className='p-2 rounded-2xl bg-bg-message'>
          Loading...
        </span>
      </div>
    )
  }

  let messageDate: string = ''

  return (
    <div className='grow px-5 py-3 overflow-y-auto overflow-x-hidden'>
      <ul className='flex flex-col max-w-[580px]'>
        {messages?.map((m, i) => {
          const isOpponent = m.sender_id === currentOpponentId
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
            'min-w-[95px] p-[10px] rounded-2xl break-words whitespace-pre-line',
            isOpponent ? 'bg-accent' : 'bg-bg-message',
            {
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

          const messageTime = messageDateObj.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
          })

          const avatar = getPublicAvatarUrl(
            isOpponent ? currentOpponentAvatar : loggedInUserData?.avatar,
            isOpponent
              ? currentOpponentAvatarVersion
              : loggedInUserData?.avatar_version
          )

          return (
            <Fragment key={m.id}>
              {isShowNewDate && <MessageDate date={normalisedDate} />}

              <ChatMessage
                className={messageBaseClasses}
                messageContentClassName={messageContentBaseClasses}
                isShowAvatar={isShowAvatar}
                isOpponent={isOpponent}
                avatar={avatar}
                userName={currentOpponentName}
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