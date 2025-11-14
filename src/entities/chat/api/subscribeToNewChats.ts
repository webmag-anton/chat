import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabaseClient'
import { type Chat } from '../types'

export const subscribeToNewChats = (
  onNewChat: (chat: Chat) => void
): RealtimeChannel => {
  const channel = supabase
    .channel('chats')
    .on('postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chats'
      },
      (payload) => onNewChat(payload.new as Chat)
    )
    .subscribe()

  return channel
}