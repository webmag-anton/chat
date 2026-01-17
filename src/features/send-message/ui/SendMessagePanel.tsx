import { type ChangeEvent } from 'react'
import { Button } from '@/shared/ui/button'
import { useAuthStore } from '@/features/authentication'
import { useChatStore } from '@/entities/chat'
import { useSendMessage } from '../model/useSendMessage'
import { useMessageStore } from '../model/messageStore'
import { useTypingSender } from '@/features/typing-tracker'
import { MessageTextarea } from '@/shared/ui/message-textarea'
import { Icon } from '@/shared/ui/icon'
import SendSvg from '@/shared/assets/icons/send.svg?react'

export const SendMessagePanel = () => {
  const message = useMessageStore(s => s.message)
  const setMessage = useMessageStore(s => s.setMessage)
  const setMessageTextareaRows = useMessageStore(s => s.setMessageTextareaRows)
  const session = useAuthStore(s => s.session)
  const currentOpponentId = useChatStore(s => s.currentOpponentId)
  const currentChatId = useChatStore(s => s.currentChatId)
  const updateCurrentChatId = useChatStore(s => s.updateCurrentChatId)

  const sendMessage = useSendMessage(session?.user.id ?? '')
  const {
    notifyTyping,
    notifyStopped
  } = useTypingSender(currentChatId, session?.user.id ?? null)

  const isMessageEmpty = !message.trim()
  const isBtnActive= !!currentOpponentId && !isMessageEmpty

  const handleMessageSending = async () => {
    if (!session || !currentOpponentId || isMessageEmpty) return

    sendMessage.mutate(
      {
        recipientId: currentOpponentId,
        messageText: JSON.stringify(message)
      },
      {
        onSuccess: (chatId) => {
          setMessage('')
          setMessageTextareaRows(1)
          updateCurrentChatId(chatId)
        },
        onError: (error) => {
          console.error('Failed to send message: ', error)
        }
      }
    )
  }

  return (
    <div className='flex basis-[var(--text-input-height)] shrink-0'>
      <MessageTextarea
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
        onKeyDown={notifyTyping}
        onKeyUp={notifyStopped}
        onMessageSend={handleMessageSending}
        fullWidth
      />
      <Button
        className='font-bold tracking-wider'
        onClick={handleMessageSending}
        horizontalPadding='lg'
        disabled={!isBtnActive}
        square
        hasBorders={false}
      >
        <Icon
          Svg={SendSvg}
          width={32}
          height={32}
          fill='currentColor'
        />
      </Button>
    </div>
  )
}