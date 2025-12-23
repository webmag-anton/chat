import { supabase } from '@/shared/api/supabaseClient'
import type { RealtimeChannel } from '@supabase/supabase-js'

let channel: RealtimeChannel | null = null
let isSubscribed = false

export const getTypingChannel = () => {
  if (channel && !isSubscribed) {
    channel = null
    isSubscribed = false
  }

  if (!channel) {
    channel = supabase.channel('typing:tracker', {
      config: { broadcast: { self: false } }
    })

    channel.subscribe((status) => {
      isSubscribed = status === 'SUBSCRIBED'
    })
  }

  return channel
}