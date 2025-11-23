import { type ChangeEvent, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { useAuthStore } from '@/features/authentication'
import { useChatStore } from '@/entities/chat'
import { useSendMessage } from '../model/useSendMessage'
import { MessageTextarea } from '@/shared/ui/message-textarea'

export const ChatFooter = () => {
  const [ message, setMessage ] = useState('')
  const [ rows, setRows ] = useState<number>(1)
  const { session } = useAuthStore()
  const {
    currentUserId,
    updateCurrentChatId
  } = useChatStore()
  const sendMessage = useSendMessage(session?.user.id ?? '')

  const handleMessageSending = async () => {
    if (!session || !currentUserId || !message.trim()) return

    sendMessage.mutate(
      {
        recipientId: currentUserId,
        messageText: JSON.stringify(message)
      },
      {
        onSuccess: (chatId) => {
          setMessage('')
          setRows(1)
          updateCurrentChatId(chatId)
        },
        onError: (error) => {
          console.error('Failed to send message: ', error)
        }
      }
    )
  }

  return (
    <div className='flex basis-[60px] shrink-0'>
      <MessageTextarea
        value={message}
        rows={rows}
        setRows={setRows}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
        onMessageSend={handleMessageSending}
        fullWidth
        className='border-r-1'
      />
      <Button
        className='font-bold text-[#072c82] tracking-wider'
        onClick={handleMessageSending}
        square
        hasBorders={false}
      >
        Send
      </Button>
    </div>
  )
}