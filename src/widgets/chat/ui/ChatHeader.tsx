import { useChatStore } from '@/entities/chat'
import { useOpponentLastSeen } from '@/features/last-seen'
import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import ArrowLeftSvg from '@/shared/assets/icons/left-arrow.svg?react'

export const ChatHeader = () => {
  const currentOpponentName = useChatStore(s => s.currentOpponentName)
  const currentOpponentId = useChatStore(s => s.currentOpponentId)
  const clearActiveChat = useChatStore(s => s.clearActiveChat)

  const lastSeenText = useOpponentLastSeen(currentOpponentId)

  return (
    <div
      className='
        flex
        basis-[var(--headers-height)]
        border-text-reverted
        md:border-l
        bg-blue
      '
    >
      <Button
        variant='transparent'
        className='md:hidden text-main'
        onClick={clearActiveChat}
        horizontalPadding='lg'
        square
        hasBorders={false}
        fullHeight
      >
        <Icon
          Svg={ArrowLeftSvg}
          width={32}
          height={32}
          fill='currentColor'
        />
      </Button>

      <div
        className='
          grow
          flex
          flex-col
          justify-between
          max-h-[var(--headers-height)]
          shrink-0
          px-5
          py-[2px]
          bg-bg-main
        '
      >
        <span className='font-bold text-lg text-main tracking-wider'>
          {currentOpponentName}
        </span>
        {currentOpponentId
          ? <span>{lastSeenText}</span>
          : null
        }
      </div>
    </div>
  )
}