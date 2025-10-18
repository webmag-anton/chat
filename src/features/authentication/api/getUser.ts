import { supabase } from '@/shared/api/supabaseClient'

export const getUser = async () => {
  return await supabase.auth.getUser()
}