import { supabase } from '@/shared/api/supabaseClient'
import { queryClient } from '@/shared/api/reactQueryClient'
import type { Chat, ChatWithOpponent } from '../types'

export async function handleNewChatInsertion(
  loggedInUserId: string,
  newChat: Chat
) {
  const { data: chat } = await supabase
    .from('chats')
    .select(`
      id,
      name,
      type,
      created_at,
      created_by,
      chat_members (
        user_id,
        profiles (
          id,
          username,
          avatar,
          avatar_version,
          bio,
          email,
          last_seen,
          updated_at
        )
      )
    `)
    .eq('id', newChat.id)
    .single()

  if (!chat) return

  const opponent =
    chat.type === 'private'
      ? chat.chat_members
        .map((m) => m.profiles)
        .find((p) => p.id !== loggedInUserId) || null
      : null

  const chatWithOpponent: ChatWithOpponent = { ...chat, opponent }

  queryClient.setQueryData<ChatWithOpponent[]>(
    ['chats', loggedInUserId],
    (old = []) => [...old, chatWithOpponent]
  )
}