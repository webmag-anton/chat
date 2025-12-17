import { useTypingStore } from '../model/typingStore'

export const TypingIndicator = ({ chatId }: { chatId: string }) => {
  const typingMap = useTypingStore((s) => s.typingByChat[chatId])
  if (!typingMap) return null

  const userIds = Object.keys(typingMap).filter((id) => typingMap[id])
  if (userIds.length === 0) return null

  const label = userIds.length === 1
    ? `typing`
    : `${userIds.length} people are typing`

  return (
    <div className='flex text-sm italic'>
      <div className='typing-dots'>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className='ml-2'>
        {label}
      </div>
    </div>
  )
}