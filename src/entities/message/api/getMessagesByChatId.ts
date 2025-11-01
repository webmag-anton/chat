import { supabase } from '@/shared/api/supabaseClient'

export const getMessagesByChatId = async (chatId: string | null) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId!)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}