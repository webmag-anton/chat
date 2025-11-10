import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/shared/api/supabaseClient'
import { queryClient } from '@/shared/api/reactQueryClient'
import { getPrivateChatId } from '@/entities/chat'
import { startPrivateChatAndSendMessage } from '../api/startPrivateChatAndSendMessage'

export const useSendMessage = (loggedInUserId: string) => {
  return useMutation({
    mutationFn: async ({
      recipientId,
      messageText,
      chatName
    }: {
      recipientId: string
      messageText: string
      chatName: string
    }) => {
      const existingChatId = await getPrivateChatId(loggedInUserId, recipientId)

      if (existingChatId) {
        const { error: messageError } = await supabase.from('messages').insert({
          chat_id: existingChatId,
          sender_id: loggedInUserId,
          content: messageText
        })
        if (messageError) throw messageError
        return existingChatId
      }

      const newChatId = await startPrivateChatAndSendMessage(
        loggedInUserId,
        recipientId,
        messageText,
        chatName
      )

      return newChatId
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats', loggedInUserId] })
    }
  })
}
