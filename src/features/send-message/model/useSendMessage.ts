import { useMutation } from '@tanstack/react-query'
import { supabase, queryClient, getPrivateChatId } from '@/shared/api'
import {
  startPrivateChatAndSendMessage
} from '../api/startPrivateChatAndSendMessage'

export const useSendMessage = (loggedInUserId: string) => {
  return useMutation({
    mutationFn: async ({
      recipientId,
      messageText
    }: {
      recipientId: string
      messageText: string
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
        messageText
      )

      return newChatId
    },

    onSuccess: (_, { recipientId }) => {
      queryClient.invalidateQueries(
        { queryKey: ['chat', loggedInUserId, recipientId] }
      )
    }
  })
}