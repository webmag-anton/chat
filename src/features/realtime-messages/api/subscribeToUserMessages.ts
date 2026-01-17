import { supabase } from '@/shared/api'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import type { Message } from '@/entities/message'

export const subscribeToUserMessages = (
  loggedInUserId: string,
  onNewMessage: (newMessage: Message, loggedInUserId: string) => void
) => {
  const channel = supabase
    .channel(`user:${loggedInUserId}:messages`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages'
      },
      async (payload: RealtimePostgresChangesPayload<Message>) => {
        const newMessage = payload.new
        if (!newMessage || !('chat_id' in newMessage) || !newMessage.chat_id) {
          return
        }

        // Check if this new message belongs to a chat where the user is a member
        const { data: isMember } = await supabase
          .from('chat_members')
          .select('chat_id')
          .eq('chat_id', newMessage.chat_id)
          .eq('user_id', loggedInUserId)
          .maybeSingle() // maybeSingle returns one record from a query or null

        if (isMember) {
          onNewMessage(newMessage, loggedInUserId)
        }
      }
    )
    .subscribe()

  return channel
}
