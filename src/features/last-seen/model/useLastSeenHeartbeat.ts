import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/features/authentication'
import { updateLastSeen } from '../api/updateLastSeen'

const MINUTE = 60_000

export const useLastSeenHeartbeat = () => {
  const interval = useRef<ReturnType<typeof setInterval>>(undefined)

  const session = useAuthStore(s => s.session)

  useEffect(() => {
    if (!session?.user?.id) return

    const userId = session.user.id

    updateLastSeen(userId)

    interval.current = setInterval(() => {
      updateLastSeen(userId)
    }, MINUTE)

    return () => {
      if (interval.current) clearInterval(interval.current)
    }
  }, [session?.user?.id])
}