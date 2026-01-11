const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function getLastSeenDate(lastSeen: string | null): string {
  if (!lastSeen) return 'last seen a long time ago'

  const now = Date.now()
  const timestamp = Date.parse(lastSeen)

  if (isNaN(timestamp)) return 'last seen a long time ago'

  const diff = now - timestamp

  // Right now
  if (diff < MINUTE) {
    return 'last seen right now'
  }

  // Minutes ago
  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE)
    return `last seen ${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }

  // Hours ago
  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR)
    return `last seen ${hours} hour${hours > 1 ? 's' : ''} ago`
  }

  // Older dates
  return formatDateWithWeekday(new Date(timestamp))
}

function formatDateWithWeekday(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const weekday = date.toLocaleDateString('en-US', {
    weekday: 'short'
  })

  return `last seen ${day}.${month}.${year} ${weekday}`
}