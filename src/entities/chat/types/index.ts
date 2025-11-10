import type { Database } from '@/shared/types/supabase.types'

export type ChatMember = Database['public']['Tables']['chat_members']['Row']
export type Chat = Database['public']['Tables']['chats']['Row']