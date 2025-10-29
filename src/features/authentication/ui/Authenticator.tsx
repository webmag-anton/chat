import { useEffect, type ReactElement } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabaseClient'
import { subscriptionManager } from '@/shared/lib/subscriptionManager'
import { useAuthStore } from '../model/authStore'
import { subscribeToProfileUpdates } from '@/features/profiles'

interface AuthenticationProps {
  loggedInComponent: ReactElement
}

export const Authenticator = ({ loggedInComponent }: AuthenticationProps) => {
  const { session, startAuthListener, stopAuthListener } = useAuthStore()

  useEffect(() => {
    startAuthListener()

    return stopAuthListener
  }, [startAuthListener, stopAuthListener])

  // Subscribe to Realtime only after session exists
  useEffect(() => {
    if (!session) return
    // prevent double initialisation
    if (subscriptionManager.subscriptions.length) return

    const channel: RealtimeChannel = subscribeToProfileUpdates()
    subscriptionManager.addSubscription(channel)

    return subscriptionManager.clearSubscriptions
  }, [session])

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  }

  return loggedInComponent
}