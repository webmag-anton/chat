import { ChatHeader } from './ChatHeader'
import { ChatWindow } from './ChatWindow'
import { SendMessagePanel } from '@/features/send-message'
import { useChatStore } from '@/entities/chat'
import clsx from 'clsx'

export const Chat = () => {
  const currentOpponentId = useChatStore(s => s.currentOpponentId)

  const baseClasses = clsx(
    'grow flex flex-col min-w-[400px] bg-text-reverted',
    'absolute inset-0 transform',
    'transition-transform duration-250 ease-in-out',
    'md:static md:transform-none md:translate-none',
    {
      'translate-x-full': !currentOpponentId,
      'translate-x-0': currentOpponentId
    }
  )

  return (
    <div className={baseClasses}>
      <ChatHeader />
      <ChatWindow />
      <SendMessagePanel />
    </div>
  )
}