import { supabase } from '@/shared/api'
import type { RealtimeChannel } from '@supabase/supabase-js'

let channel: RealtimeChannel | null = null
let isSubscribed = false

const isSubscribedState = (status: unknown): status is 'SUBSCRIBED' =>
  status === 'SUBSCRIBED'

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
      isSubscribed = isSubscribedState(status)
    })
  }

  return channel
}