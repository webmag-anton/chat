import { supabase } from '@/shared/api'

export const updateLastSeen = async ( loggedInUserId: string ) => {
  const { error } = await supabase
    .from('profiles')
    .update({ last_seen: new Date().toISOString() })
    .eq('id', loggedInUserId)

  if (error) {
    console.error('last_seen update failed:', error)
  }
}