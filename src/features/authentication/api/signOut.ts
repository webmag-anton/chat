import { supabase } from '@/shared/api/supabaseClient'

export const signOut = async () => {
  return await supabase.auth.signOut()
}