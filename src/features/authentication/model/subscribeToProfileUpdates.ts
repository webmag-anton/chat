import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabaseClient'

export const subscribeToProfileUpdates = (): RealtimeChannel => {
  const channel = supabase
    .channel('public:profiles')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'profiles' },
      (payload) => {
        console.log('Change in profiles:', payload)
      }
    )
    .subscribe()

  return channel
}