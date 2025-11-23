import { Avatar } from '@/shared/ui/avatar'
import type { Message } from '../types'

interface ChatMessageProps {
  className: string
  messageContentClassName: string
  isShowAvatar: boolean
  isOpponent: boolean
  avatar: string | null
  userName: string | null
  message: Message
  messageTime: string
}

export const ChatMessage = (props: ChatMessageProps) => {
  const {
    className,
    messageContentClassName,
    isShowAvatar,
    isOpponent,
    avatar,
    userName,
    message,
    messageTime
  } = props

  const messageContent = JSON.parse(message.content)

  return (
    <li
      className={className}
    >
      <div
        className='
          self-end
          relative
          basis-[48px]
          shrink-0
          h-[48px]
          mr-3
        '
      >
        {isShowAvatar && (
          <>
            <Avatar
              url={avatar}
              size={48}
              title={`${userName}'s avatar`}
              fill='#ededed'
            />
            {!avatar && (
              <span
                className='
                  absolute
                  top-1/2
                  left-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  font-semibold
                '
              >
                {isOpponent ? userName?.[0] : 'Me'}
              </span>
            )}
          </>
        )}
      </div>

      <div className={messageContentClassName}>
        {messageContent}

        <time
          dateTime={message.created_at}
          className='
            inline-block
            translate-y-[9px]
            ml-3
            text-sm
            float-right
          '
        >
          {messageTime}
        </time>
      </div>
    </li>
  )
}