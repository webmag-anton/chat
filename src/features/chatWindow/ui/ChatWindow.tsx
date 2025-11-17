import { useChatStore } from '@/entities/chat'
import { useMessagesQuery } from '@/entities/message'
import { Avatar } from '@/shared/ui/avatar'
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

  return (
    <div className='grow px-5 py-3 border-y overflow-y-auto overflow-x-hidden'>
      <ul className='flex flex-col max-w-[580px]'>
        {messages?.map((m, i) => {
          const isOpponent = m.sender_id === currentUserId

          const next = messages[i + 1]
          const isLastInSeries = !next || next.sender_id !== m.sender_id

          const baseClasses = clsx(
            'self-end min-w-0 p-2 rounded-2xl break-words bg-[#edf0f8]',
            {
              'bg-accent': isOpponent,
              'rounded-bl-none': isLastInSeries
            }
          )

          return (
            <li
              key={m.id}
              className='flex self-start max-w-full mb-2'
            >
              <div className='relative basis-[60px] shrink-0 h-[60px] mr-3'>
                {isLastInSeries && (
                  <>
                    <Avatar
                      url={currentUserAvatar}
                      size={60}
                      title={`${currentUserName}'s avatar`}
                      fill='#ededed'
                    />
                    {!currentUserAvatar && (
                      <span
                        className='
                          absolute
                          top-1/2
                          left-1/2
                          -translate-x-1/2
                          -translate-y-1/2
                          text-[18px]
                        '
                      >
                        {isOpponent ? currentUserName?.[0] : 'Me'}
                      </span>
                    )}
                  </>
                )}
              </div>

              <span className={baseClasses}>
                {m.content}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}