import { useEffect, type ReactElement } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/shared/api/supabaseClient.ts'
import { useAuthStore } from '../model/authStore.ts'

interface AuthenticationProps {
  loggedInComponent: ReactElement
}

export const Authenticator = (props: AuthenticationProps) => {
  const { loggedInComponent } = props

  const { session, logIn, startAuthListener, stopAuthListener } = useAuthStore()

  useEffect(() => {
    const init = async () => {
      await logIn()
      startAuthListener()
    }
    init()

    return () => {
      stopAuthListener()
    }
  }, [logIn, startAuthListener, stopAuthListener])

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
      />
    )
  }
  return loggedInComponent
}