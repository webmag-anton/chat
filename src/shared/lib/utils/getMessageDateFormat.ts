const dayMs = 1000 * 60 * 60 * 24
const weekMs = dayMs * 7

export const getMessageDateFormat = (dateString: string | null) => {
  if (!dateString) return null

  const now = Date.now()
  const timestamp = Date.parse(dateString)
  const diffMs = now - timestamp
  const date = new Date(timestamp)

  if (diffMs < dayMs) {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })

  if (diffMs < weekMs) {
    return weekday
  }

  const fullDate = date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return `${fullDate} ${weekday}`
}