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
        px-3
      '
    >
      <span
        className='text-xl font-semibold text-[#072c82] tracking-wider'
      >
        {currentUserName}
      </span>
    </div>
  )
}