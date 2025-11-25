import type { ChangeEvent, TextareaHTMLAttributes } from 'react'
import { useMessageStore } from '@/features/sendMessage'
import clsx from 'clsx'

const maxRows: number = 8

interface MessageTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onMessageSend: () => void
  fullWidth?: boolean
  fullHeight?: boolean
  className?: string
}

export const MessageTextarea = (props: MessageTextareaProps) => {
  const {
    onChange,
    onMessageSend,
    fullHeight = false,
    fullWidth = false,
    className,
    ...otherProps
  } = props

  const { messageTextareaRows, setMessageTextareaRows } = useMessageStore()

  const textareaClasses = clsx(
    'w-full px-5 py-4 leading-[28px] bg-[#3f4050] text-white resize-none',
    {
      'w-full': fullWidth,
      'h-full': fullHeight,
    },
    className
  )

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const newRows = value.split('\n').length

    setMessageTextareaRows(Math.max(1, Math.min(newRows, maxRows)))
    onChange(e)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onMessageSend()
    }
  }

  return (
    <textarea
      id='message-textarea'
      rows={messageTextareaRows}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={textareaClasses}
      placeholder='Write a message...'
      {...otherProps}
    />
  )
}
