import { supabase } from '@/shared/api/supabaseClient'

export const getPrivateChatId = async (currentUserId: string, otherUserId: string) => {
  const { data, error } = await supabase.rpc('get_existing_private_chat', {
    user_a: currentUserId,
    user_b: otherUserId
  })

  if (error) {
    console.error('Error checking private chat:', error)
    return null
  }

  return data // ID of the chat or null
}