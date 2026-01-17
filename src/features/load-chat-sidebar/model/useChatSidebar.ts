import { useEffect } from 'react'
import { useChatSidebarStore } from './chatSidebarStore'
import { useFirstChatId } from '@/shared/hooks'
import { useAuthStore } from '@/features/authentication'

export const useChatSidebar = () => {
  const listType = useChatSidebarStore(s => s.listType)
  const setListType = useChatSidebarStore(s => s.setListType)
  const toggleListType = useChatSidebarStore(s => s.toggleListType)

  const session = useAuthStore(s => s.session)
  const loggedInUserId = session?.user?.id ?? ''
  const { data: firstChatId, isLoading } = useFirstChatId(loggedInUserId)

  useEffect(() => {
    if (firstChatId !== undefined) {
      setListType(firstChatId ? 'chats' : 'users')
    }
  }, [firstChatId, setListType])

  return {
    listType,
    toggleListType,
    isInitialized: firstChatId !== undefined && !isLoading
  }
}