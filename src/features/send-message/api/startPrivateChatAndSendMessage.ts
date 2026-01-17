import { supabase } from '@/shared/api'

export const startPrivateChatAndSendMessage = async (
  senderId: string,
  recipientId: string,
  messageText: string
) => {
  const { data: newChatId, error } =
    await supabase.rpc('start_private_chat_and_send_message', {
      sender_id: senderId,
      recipient_id: recipientId,
      message_text: messageText
    })

  if (error) throw error
  return newChatId
}
