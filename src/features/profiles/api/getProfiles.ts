import { supabase } from '@/shared/api/supabaseClient'
import type { UserProfile } from '@/entities/user'

export const getProfiles = async (): Promise<UserProfile[]> => {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error
  return data
}
