import type { ChangeEvent, TextareaHTMLAttributes } from 'react'
import { useEffect, useRef } from 'react'
import { useMessageStore } from '@/features/send-message'
import clsx from 'clsx'

const maxRows: number = 8

interface MessageTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: () => void
  onKeyUp: () => void
  onMessageSend: () => void
  fullWidth?: boolean
  fullHeight?: boolean
  className?: string
}

export const MessageTextarea = (props: MessageTextareaProps) => {
  const {
    onChange,
    onKeyDown,
    onKeyUp,
    onMessageSend,
    fullHeight = false,
    fullWidth = false,
    className,
    ...otherProps
  } = props

  const {
    message,
    messageTextareaRows,
    focusTextareaToken
  } = useMessageStore()

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

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

    useMessageStore.getState()
      .setMessageTextareaRows(Math.max(1, Math.min(newRows, maxRows)))
    onChange(e)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onMessageSend()
    } else {
      onKeyDown()
    }
  }

  useEffect(() => {
    textareaRef.current?.focus()
  }, [focusTextareaToken])

  return (
    <textarea
      id='message-textarea'
      value={message}
      ref={textareaRef}
      rows={messageTextareaRows}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyUp={onKeyUp}
      className={textareaClasses}
      placeholder='Write a message...'
      {...otherProps}
    />
  )
}
