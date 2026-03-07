import { supabase } from '../supabaseClient'

export const getFirstChatId = async (): Promise<string | null> => {
  const { data: chat, error } = await supabase
    .from('chats')
    .select('id')
    .limit(1)

  if (error) {
    throw error
  }

  return chat?.[0]?.id ?? null
}