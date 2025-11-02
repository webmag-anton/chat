import type { Database } from '@/shared/types/supabase.types'

export type Message = Database['public']['Tables']['messages']['Row']