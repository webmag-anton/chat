import { supabase } from '@/shared/api/supabaseClient'

export const getFirstChatId = async (): Promise<string | null> => {
  const { data: chat, error } = await supabase
    .from('chats')
    .select('id')
    .limit(1)

  if (error) {
    console.error('Error while checking chats existence:', error)
    return null
  }

  return chat?.[0]?.id ?? null
}