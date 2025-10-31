import { useChatStore } from '@/entities/chat'

export const ChatHeader = () => {
  const { currentUserName } = useChatStore()

  return (
    <div className='flex items-center h-[var(--headers-height)] px-3'>
      <span>{currentUserName}</span>
    </div>
  )
}