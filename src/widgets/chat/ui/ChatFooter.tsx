import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export const ChatFooter = () => {
  return (
    <div className='flex h-[60px]'>
      <Input
        id='messageInput'
        fullWidth
        fullHeight
        placeholder='Write a message...'
      />
      <Button
        id='messageSubmitter'
        className='border-l-1'
        square
        fullHeight
        hasBorders={false}
      >
        send
      </Button>
    </div>
  )
}