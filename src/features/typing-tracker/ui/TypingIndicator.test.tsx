import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { TypingIndicator } from './TypingIndicator'
import { useTypingStore } from '../model/typingStore'

const resetStore = () => {
  act(() => {
    useTypingStore.setState({
      typingByChat: {},
      timers: {}
    })
  })
}

describe('TypingIndicator', () => {
  afterEach(() => {
    resetStore()
  })

  it('renders nothing when nobody is typing', () => {
    const { container } = render(<TypingIndicator chatId='chat-1' />)

    expect(container).toBeEmptyDOMElement()
  })

  it('shows the singular label when one user is typing', () => {
    act(() => {
      useTypingStore.setState({
        typingByChat: {
          'chat-1': {
            'user-1': true
          }
        },
        timers: {}
      })
    })

    render(<TypingIndicator chatId='chat-1' />)

    expect(screen.getByText('typing')).toBeInTheDocument()
  })

  it('shows the plural label when several users are typing', () => {
    act(() => {
      useTypingStore.setState({
        typingByChat: {
          'chat-1': {
            'user-1': true,
            'user-2': true,
            'user-3': false
          }
        },
        timers: {}
      })
    })

    render(<TypingIndicator chatId='chat-1' />)

    expect(screen.getByText('2 people are typing')).toBeInTheDocument()
  })
})
