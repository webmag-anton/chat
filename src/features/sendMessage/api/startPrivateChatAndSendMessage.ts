import { supabase } from '@/shared/api/supabaseClient'

export const startPrivateChatAndSendMessage = async (
  senderId: string,
  recipientId: string,
  messageText: string,
  chatName: string
) => {
  const { data: newChatId, error } =
    await supabase.rpc('start_private_chat_and_send_message', {
      sender_id: senderId,
      recipient_id: recipientId,
      message_text: messageText,
      chat_name: chatName
    })

  if (error) throw error
  return newChatId
}
