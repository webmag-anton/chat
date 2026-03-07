import { supabase } from '../supabaseClient'

export const getPrivateChatId = async (
  loggedInUserId: string,
  opponentId: string
): Promise<string | null> => {
  const { data, error } = await supabase.rpc('get_existing_private_chat', {
    user_a: loggedInUserId,
    user_b: opponentId
  })

  if (error) {
    throw error
  }

  return data
}