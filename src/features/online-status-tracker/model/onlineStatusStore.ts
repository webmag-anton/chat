import { create } from 'zustand'
import type { RealtimePresenceState } from '@supabase/supabase-js'

interface onlineStatusState {
  onlineUsers: string[]
  setOnlineUsers: (state: RealtimePresenceState) => void
}

export const useOnlineStatusStore = create<onlineStatusState>(( set ) => ({
  onlineUsers: [],
  setOnlineUsers: (state) => {
    set({
      onlineUsers: Object.keys(state)
    })
  }
}))