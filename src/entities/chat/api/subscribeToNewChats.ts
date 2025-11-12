import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabaseClient.ts'
import type { Chat } from '../types'

export const subscribeToNewChats =
  (onNewChat: (chat: Chat) => void): RealtimeChannel => {
  const channel = supabase
    .channel('chats')
    .on('postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chats'
      },
      payload => {
        const newChat = payload.new
        onNewChat(newChat as Chat)
      }
    )
    .subscribe()

  return channel
}