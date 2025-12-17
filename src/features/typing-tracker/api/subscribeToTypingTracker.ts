import { supabase } from '@/shared/api/supabaseClient'
import type { RealtimeChannel } from '@supabase/supabase-js'
import type { TypingPayload } from './sendTypingEvent'

export const subscribeToTypingTracker = (
  onTyping: (payload: TypingPayload) => void
): RealtimeChannel => {
  const channel = supabase
    .channel('typing:tracker', { config: { broadcast: { self: true } } })
    .on('broadcast', { event: 'typing' }, (msg) => {
      // msg.payload holds the actual payload in supabase-js
      const payload = (msg.payload ?? msg) as TypingPayload
      if (!payload || !payload.chatId || !payload.userId) return
      onTyping(payload)
    })
    .subscribe()

  return channel
}
