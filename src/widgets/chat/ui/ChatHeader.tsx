import { useChatStore } from '@/entities/chat'

export const ChatHeader = () => {
  const { currentUserName } = useChatStore()

  return (
    <div
      className='
        flex
        items-center
        basis-[var(--headers-height)]
        shrink-0
        px-5
      '
    >
      <span
        className='text-xl tracking-wider'
      >
        {currentUserName}
      </span>
    </div>
  )
}