import { useEffect, type ReactElement } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabaseClient.ts'
import { subscriptionManager } from '@/shared/lib/subscriptionManager'
import { useAuthStore } from '../model/authStore.ts'
import { subscribeToProfileUpdates } from '../model/subscribeToProfileUpdates.ts'

interface AuthenticationProps {
  loggedInComponent: ReactElement
}

export const Authenticator = (props: AuthenticationProps) => {
  const { loggedInComponent } = props

  const { session, logIn, startAuthListener, stopAuthListener } = useAuthStore()

  useEffect(() => {
    let profileChannel: RealtimeChannel | null = null

    const init = async () => {
      await logIn()
      startAuthListener()

      profileChannel = subscribeToProfileUpdates()
      if (profileChannel) subscriptionManager.addSubscription(profileChannel)
    }

    // guard to prevent double initialisation
    if (subscriptionManager.subscriptions.length) return

    init()

    return () => {
      stopAuthListener()
      subscriptionManager.clearSubscriptions()
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