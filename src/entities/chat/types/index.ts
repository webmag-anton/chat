import type { Database } from '@/shared/types/supabase.types'

export type ChatMember = Database['public']['Tables']['chat_members']['Row']