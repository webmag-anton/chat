import type { RealtimeChannel } from '@supabase/supabase-js'

interface ISubscriptionManager {
  subscriptions: RealtimeChannel[]
  addSubscription: (channel: RealtimeChannel) => void
  clearSubscriptions: () => void
}

export const subscriptionManager: ISubscriptionManager = {
  subscriptions: [],
  addSubscription: (channel) => {
    subscriptionManager.subscriptions.push(channel)
  },
  clearSubscriptions: async () => {
    for (const channel of subscriptionManager.subscriptions) {
      try {
        await channel.untrack?.()
        await channel.unsubscribe()
      } catch (e) {
        console.warn('Error unsubscribing channel:', e)
      }
    }
    subscriptionManager.subscriptions.length = 0
  }
}