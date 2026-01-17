import { useChatStore } from '@/entities/chat'
import { useOpponentLastSeen } from '@/features/last-seen'

export const ChatHeader = () => {
  const currentOpponentName = useChatStore(s => s.currentOpponentName)
  const currentOpponentId = useChatStore(s => s.currentOpponentId)

  const lastSeenText = useOpponentLastSeen(currentOpponentId)

  return (
    <div
      className='
        flex
        flex-col
        justify-between
        basis-[var(--headers-height)]
        max-h-[var(--headers-height)]
        shrink-0
        px-5
        py-[2px]
        bg-bg-main
        border-l
        border-text-reverted
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
  )
}