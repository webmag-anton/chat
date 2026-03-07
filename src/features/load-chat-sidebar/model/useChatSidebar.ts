import { useEffect } from 'react'
import { useChatSidebarStore } from './chatSidebarStore'
import { useFirstChatId } from '@/shared/hooks'
import { useAuthStore } from '@/features/authentication'
import type { listType } from '../types'

export const useChatSidebar = () => {
  const listTypeOverride = useChatSidebarStore(s => s.listTypeOverride)
  const toggleListTypeInStore = useChatSidebarStore(s => s.toggleListType)
  const reset = useChatSidebarStore(s => s.reset)

  const session = useAuthStore(s => s.session)
  const loggedInUserId = session?.user?.id ?? ''

  const {
    data: firstChatId,
    isLoading,
    isError,
    error
  } = useFirstChatId(loggedInUserId)

  // undefined = still loading
  const defaultType: listType =
    !loggedInUserId || isError || firstChatId === undefined
      ? 'users'
      : firstChatId
        ? 'chats'
        : 'users'

  const listType: listType = listTypeOverride ?? defaultType

  const toggleListType = () => toggleListTypeInStore(defaultType)

  useEffect(() => {
    reset()
  }, [loggedInUserId, reset])

  useEffect(() => {
    if (isError) {
      console.error('Failed to fetch first chat', error)
    }
  }, [isError, error])

  return {
    listType,
    toggleListType,
    isInitialized: !!loggedInUserId && !isLoading
  }
}