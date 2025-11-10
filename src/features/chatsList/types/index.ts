import type { Chat } from '@/entities/chat'
import type { UserProfile } from '@/entities/profile'

export type ChatWithOpponent = Chat & {
  chat_members: {
    user_id: string
    profiles: UserProfile
  }[]
  opponent: UserProfile | null
}