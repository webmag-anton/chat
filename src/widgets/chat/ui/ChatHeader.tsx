import { useChatStore } from '@/entities/chat'

export const ChatHeader = () => {
  const { currentOpponentName } = useChatStore()

  return (
    <div
      className='
        flex
        items-center
        basis-[var(--headers-height)]
        shrink-0
        px-5
        py-1
        bg-bg-main
        border-l
        border-text-reverted
        font-bold
      '
    >
      <span
        className='text-lg text-main tracking-wider'
      >
        {currentOpponentName}
      </span>
    </div>
  )
}