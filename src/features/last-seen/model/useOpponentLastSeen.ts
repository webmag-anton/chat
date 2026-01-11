import { useEffect, useMemo, useState } from 'react'
import { useOnlineStatusStore } from '@/features/online-status-tracker'
import { useProfilesQuery } from '@/features/profiles-list'
import { getLastSeenDate } from './getLastSeenDate'

const MINUTE = 60_000

export const useOpponentLastSeen = (opponentId: string | null) => {
  const onlineUsers = useOnlineStatusStore(s => s.onlineUsers)
  const { data: profiles } = useProfilesQuery()

  const opponentLastSeen = useMemo(() => {
    if (!profiles || !opponentId) return null
    return profiles.find(p => p.id === opponentId)?.last_seen ?? null
  }, [profiles, opponentId])

  const isOpponentOnline = opponentId
    ? onlineUsers.includes(opponentId)
    : false

  const [lastSeenText, setLastSeenText] = useState('')

  useEffect(() => {
    const update = () => {
      setLastSeenText(
        isOpponentOnline
          ? 'online'
          : getLastSeenDate(opponentLastSeen)
      )
    }

    update()
    const id = setInterval(update, MINUTE)

    return () => clearInterval(id)
  }, [isOpponentOnline, opponentLastSeen])

  return lastSeenText
}
