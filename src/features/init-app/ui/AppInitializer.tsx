import { type ReactNode, useEffect } from 'react'
import {
  useAuthStore,
  useRealtimeSubscriptions
} from '@/features/authentication'

interface Props {
  children: ReactNode
}

export const AppInitializer = ({ children }: Props) => {
  const session = useAuthStore(s => s.session)
  const startAuthListener = useAuthStore(s => s.startAuthListener)
  const stopAuthListener = useAuthStore(s => s.stopAuthListener)

  useEffect(() => {
    startAuthListener()
    return stopAuthListener
  }, [startAuthListener, stopAuthListener])

  useRealtimeSubscriptions(session)

  return children
}