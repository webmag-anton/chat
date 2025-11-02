import type { Database } from '@/shared/types/supabase.types'

export type UserProfile = Database['public']['Tables']['profiles']['Row']