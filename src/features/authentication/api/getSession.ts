import { supabase } from '@/shared/api/supabaseClient'

export const getSession = async () => {
  return await supabase.auth.getSession()
}