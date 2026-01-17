import { supabase } from '@/shared/api'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import type { ChatMember } from '@/entities/chat'

export const subscribeToNewChatMembership = (
  userId: string,
  onNewChatMembership: (newChatMember: ChatMember) => void
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
        const newMember = payload.new

        if ('chat_id' in newMember) {
          onNewChatMembership(newMember as ChatMember)
        }
      }
    )
    .subscribe()

  return channel
}