import { supabase } from '@/shared/api'
import type { UserProfile } from '@/entities/profile'

export const getLoggedInUserProfile
  = async (loggedInUserId: string): Promise<UserProfile> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', loggedInUserId)
      .single()

    if (error) throw error
    return data
  }
