import { supabase } from '@/shared/api'
import type { ChatWithOpponent } from '@/entities/chat'

/*
  Because of RLS rules, Supabase only returns chats that the current user belongs to.
  Therefore, there's no need to filter chats by loggedInUserId manually.

  For each chat:
  - `chat_members`: selects rows from `chat_members` belonging to this chat
    (because of the relationship: chats.id → chat_members.chat_id).
  - `profiles`: for each chat member, fetch the user's profile
    (because chat_members.user_id → profiles.id).

  So it's the only correct RLS-friendly way to get the opponent’s profile.
*/
export const getChats = async (loggedInUserId: string): Promise<ChatWithOpponent[]> => {
  const { data: chats, error } = await supabase
    .from('chats')
    .select(`
      id,
      name,
      type,
      created_at,
      created_by,
      last_message_at,
      last_message_id,
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
    .order('last_message_at', { ascending: false })

  if (error) throw error
  if (!chats) return []

  const chatsWithOpponent: ChatWithOpponent[] = chats.map(chat => {
    const opponent =
      chat.type === 'private'
        ? chat.chat_members
          .map(m => m.profiles)
          .find(p => p.id !== loggedInUserId) || null
        : null

    return {
      ...chat,
      opponent
    }
  })

  return chatsWithOpponent
}
