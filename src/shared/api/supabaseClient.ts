import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase.types'

const supabaseProjectUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseProjectUrl, supabaseKey)