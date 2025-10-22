import { supabase } from '@/shared/api/supabaseClient'

export const signOut = async (): Promise<
  Awaited<ReturnType<typeof supabase.auth.signOut>>
> => {
  return await supabase.auth.signOut()
}