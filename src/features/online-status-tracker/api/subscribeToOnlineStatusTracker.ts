import { supabase } from '@/shared/api'
import { useOnlineStatusStore } from '../model/onlineStatusStore'
import { REALTIME_SUBSCRIBE_STATES } from '@supabase/supabase-js'

export const subscribeToOnlineStatusTracker = ( userId: string ) => {
  const channel = supabase
    .channel('online-users', {
      config: { presence: { key: userId } }
    })
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState()
      const { setOnlineUsers } = useOnlineStatusStore.getState()
      setOnlineUsers(state)
    })
    .subscribe(async (status) => {
      if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
        await channel.track({})
      }
    })

  return channel
}