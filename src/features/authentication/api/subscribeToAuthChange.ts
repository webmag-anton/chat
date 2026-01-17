import { supabase } from '@/shared/api'
import type { Session, AuthChangeEvent, Subscription } from '@supabase/supabase-js'

export const subscribeToAuthChange = (
  onChange: (event: AuthChangeEvent, session: Session | null) => void
): Subscription => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    onChange(event, session)
  })
  return data.subscription
}