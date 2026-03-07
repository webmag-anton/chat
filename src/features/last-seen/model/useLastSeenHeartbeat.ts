import { useEffect } from 'react'
import { useAuthStore } from '@/features/authentication'
import { updateLastSeen } from '../api/updateLastSeen'

const MINUTE = 60_000

export const useLastSeenHeartbeat = () => {
  const session = useAuthStore(s => s.session)
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) return

    const safeUpdate = () => {
      updateLastSeen(userId).catch((err) => {
        console.error('last_seen heartbeat failed', err)
      })
    }

    safeUpdate()

    const interval = setInterval(safeUpdate, MINUTE)

    return () => clearInterval(interval)
  }, [userId])
}