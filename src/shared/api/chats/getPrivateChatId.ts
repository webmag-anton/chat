import { supabase } from '../supabaseClient'

export const getPrivateChatId = async (
  loggedInUserId: string,
  opponentId: string
) => {
  const { data, error } = await supabase.rpc('get_existing_private_chat', {
    user_a: loggedInUserId,
    user_b: opponentId
  })

  if (error) {
    console.error('Error checking private chat:', error)
    return null
  }

  return data // ID of the chat or null
}