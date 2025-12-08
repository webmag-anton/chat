const lastToastTimes = new Map<string, number>()

export function shouldShowMessageToast(chatId: string) {
  const now = Date.now()
  const last = lastToastTimes.get(chatId) ?? 0

  if (now - last > 5000) {
    lastToastTimes.set(chatId, now)
    return true
  }

  return false
}
