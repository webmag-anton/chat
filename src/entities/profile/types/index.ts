import type { Database } from '@/shared/types/supabase.types.ts'

export type UserProfile = Database['public']['Tables']['profiles']['Row']