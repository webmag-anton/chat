import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MessageTextarea } from './MessageTextarea'
import { useMessageStore } from '@/features/send-message'

const resetStore = () => {
  useMessageStore.setState({
    message: '',
    messageTextareaRows: 1,
    focusTextareaToken: 0
  })
}

describe('MessageTextarea', () => {
  const onChange = vi.fn()
  const onKeyDown = vi.fn()
  const onKeyUp = vi.fn()
  const onMessageSend = vi.fn()

  beforeEach(() => {
    resetStore()
    vi.clearAllMocks()
  })

  afterEach(() => {
    resetStore()
  })

  const renderTextarea = () => render(
    <MessageTextarea
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onMessageSend={onMessageSend}
      fullWidth
    />
  )

  it('updates the row count from the entered text and caps it at eight rows', () => {
    renderTextarea()

    const textarea = screen.getByPlaceholderText('Write a message...')

    act(() => {
      fireEvent.change(textarea, {
      target: {
        value: Array.from({ length: 10 }, (_, index) => `line ${index + 1}`).join('\n')
      }
    })
    })

    expect(useMessageStore.getState().messageTextareaRows).toBe(8)
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('sends the message on Enter without Shift', () => {
    renderTextarea()

    const textarea = screen.getByPlaceholderText('Write a message...')
    act(() => {
      fireEvent.keyDown(textarea, { key: 'Enter' })
    })

    expect(onMessageSend).toHaveBeenCalledTimes(1)
    expect(onKeyDown).not.toHaveBeenCalled()
  })

  it('keeps multiline editing on Shift+Enter and notifies typing', () => {
    renderTextarea()

    const textarea = screen.getByPlaceholderText('Write a message...')

    act(() => {
      fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true })
    })

    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(onMessageSend).not.toHaveBeenCalled()
  })

  it('focuses the textarea again when focus is requested from the store', () => {
    renderTextarea()

    const textarea = screen.getByPlaceholderText('Write a message...')

    textarea.blur()
    expect(textarea).not.toHaveFocus()

    act(() => {
      useMessageStore.getState().requestTextareaFocus()
    })

    expect(textarea).toHaveFocus()
  })
})
