import { useEffect, type ReactElement } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/shared/api/supabaseClient'
import { useAuthStore } from '../model/authStore'
import { useRealtimeSubscriptions } from '../model/useRealtimeSubscriptions'

interface AuthenticationProps {
  loggedInComponent: ReactElement
}

export const Authenticator = ({ loggedInComponent }: AuthenticationProps) => {
  const { session, startAuthListener, stopAuthListener } = useAuthStore()

  useEffect(() => {
    startAuthListener()

    return stopAuthListener
  }, [startAuthListener, stopAuthListener])

  useRealtimeSubscriptions(session)

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  }

  return loggedInComponent
}