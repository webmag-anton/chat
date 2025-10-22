import { supabase } from '@/shared/api/supabaseClient'

export const getSession = async (): Promise<
  Awaited<ReturnType<typeof supabase.auth.getSession>>
> => {
  return await supabase.auth.getSession()
}