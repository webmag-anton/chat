import { supabase } from '@/shared/api/supabaseClient'

export const getUser = async (): Promise<
  Awaited<ReturnType<typeof supabase.auth.getUser>>
> => {
  return await supabase.auth.getUser()
}