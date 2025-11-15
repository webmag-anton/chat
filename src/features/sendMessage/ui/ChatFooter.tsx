import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useAuthStore } from '@/features/authentication'
import { useChatStore } from '@/entities/chat'
import { useSendMessage } from '../model/useSendMessage'

export const ChatFooter = () => {
  const [ message, setMessage ] = useState('')
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
        messageText: message
      },
      {
        onSuccess: (chatId) => {
          updateCurrentChatId(chatId)
          setMessage('')
        },
        onError: (error) => {
          console.error('Failed to send message: ', error)
        }
      }
    )
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleMessageSending()
    }
  }

  return (
    <div className='flex basis-[60px] shrink-0'>
      <Input
        className='border-r-1'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={handleKeyUp}
        fullWidth
        placeholder='Write a message...'
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