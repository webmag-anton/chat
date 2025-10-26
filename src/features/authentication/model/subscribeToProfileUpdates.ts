import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabaseClient'
import { queryClient } from '@/main'
import type { UserProfile } from '@/entities/user'

export const subscribeToProfileUpdates = (): RealtimeChannel => {
  const channel = supabase
    .channel('public:profiles')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'profiles' },
      ({ eventType, new: newRow, old: oldRow }) => {
        queryClient.setQueryData(['profiles'], (prev: UserProfile[] = []) => {
          switch (eventType) {
            case 'INSERT':
              return [...prev, newRow]
            case 'UPDATE':
              return prev.map(profile =>
                profile.id === newRow.id ? newRow : profile)
            case 'DELETE':
              return prev.filter(profile => profile.id !== oldRow.id)
            default:
              return prev
          }
        })
      }
    )
    .subscribe()

  return channel
}