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
  const session = useAuthStore(s => s.session)
  const startAuthListener = useAuthStore(s => s.startAuthListener)
  const stopAuthListener = useAuthStore(s => s.stopAuthListener)

  useEffect(() => {
    startAuthListener()

    return stopAuthListener
  }, [startAuthListener, stopAuthListener])

  useRealtimeSubscriptions(session)

  if (!session) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='p-6 bg-white rounded-xl shadow-md'>
          <Auth
            supabaseClient={supabase}
            providers={['github', 'google', 'linkedin']}
            appearance={{
              theme: ThemeSupa
            }}
          />
        </div>
      </div>
    )
  }

  return loggedInComponent
}