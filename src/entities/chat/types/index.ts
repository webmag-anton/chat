import type { Database } from '@/shared/types/supabase.types'
import type { UserProfile } from '@/entities/profile'

export type ChatMember = Database['public']['Tables']['chat_members']['Row']
export type Chat = Database['public']['Tables']['chats']['Row']

export type ChatWithOpponent = Chat & {
  chat_members: {
    user_id: string
    profiles: UserProfile
  }[]
  opponent: UserProfile | null
}