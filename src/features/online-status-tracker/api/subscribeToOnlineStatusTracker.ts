import { supabase } from '@/shared/api/supabaseClient'
import type { RealtimePresenceState } from '@supabase/supabase-js'

export const subscribeToOnlineStatusTracker = (
  userId: string,
  onOnlineStatusChanges: (state: RealtimePresenceState) => void
) => {
  const channel = supabase
    .channel('online-users', {
      config: { presence: { key: userId } }
    })
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState()
      onOnlineStatusChanges(state)
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({})
      }
    })

  return channel
}