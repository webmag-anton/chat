import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabaseClient'
import { type Chat } from '../types'

export const subscribeToNewChats = (
  loggedInUserId: string,
  onNewChat: (loggedInUserId: string, chat: Chat) => void
): RealtimeChannel => {
  const channel = supabase
    .channel('chats')
    .on('postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chats'
      },
      (payload) => onNewChat(loggedInUserId, payload.new as Chat)
    )
    .subscribe()

  return channel
}