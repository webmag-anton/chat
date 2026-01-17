import { supabase } from '@/shared/api'
import { useOnlineStatusStore } from '../model/onlineStatusStore'

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
      if (status === 'SUBSCRIBED') {
        await channel.track({})
      }
    })

  return channel
}