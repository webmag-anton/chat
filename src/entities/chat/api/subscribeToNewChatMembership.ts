import { supabase } from '@/shared/api/supabaseClient'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import type { ChatMember } from '../types'

export const subscribeToNewChatMembership = (
  userId: string,
  onNewChatMembership: (chatMember: ChatMember) => void
) => {
  const channel = supabase
    .channel(`chat_members:user:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_members',
        filter: `user_id=eq.${userId}`
      },
      (payload: RealtimePostgresChangesPayload<ChatMember>) => {
        const chatMember = payload.new
        if (!chatMember || !('chat_id' in chatMember) || !chatMember.chat_id) return

        onNewChatMembership(chatMember)
      }
    )
    .subscribe()

  return channel
}