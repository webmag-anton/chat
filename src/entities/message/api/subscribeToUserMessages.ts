import { supabase } from '@/shared/api/supabaseClient'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import type { Message } from '../types'

export const subscribeToUserMessages = (
  userId: string,
  onMessage: (msg: Message) => void
) => {
  const channel = supabase
    .channel(`user:${userId}:messages`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages'
      },
      async (payload: RealtimePostgresChangesPayload<Message>) => {
        const message = payload.new
        if (!message || !('chat_id' in message) || !message.chat_id) return

        // Check if this message belongs to a chat where the user is a member
        const { data: isMember } = await supabase
          .from('chat_members')
          .select('chat_id')
          .eq('chat_id', message.chat_id)
          .eq('user_id', userId)
          .maybeSingle() // maybeSingle returns one record from a query or null

        if (isMember) {
          onMessage(message)
        }
      }
    )
    .subscribe()

  return channel
}
