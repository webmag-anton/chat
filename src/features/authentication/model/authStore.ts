import { create } from 'zustand'
import type { Session, Subscription } from '@supabase/supabase-js'
import { signOut } from '../api/signOut'
import { subscribeToAuthChange } from '../api/subscribeToAuthChange'

interface AuthState {
  session: Session | null
  isLoading: boolean
  error: string | null
  subscription: Subscription | null
  logOut: () => Promise<void>
  startAuthListener: () => void
  stopAuthListener: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: false,
  error: null,
  subscription: null,
  logOut: async () => {
    set({ isLoading: true, error: null })
    try {
      const { error } = await signOut()
      if (error) throw error
      set({ session: null, isLoading: false })
    } catch (err: any) {
      console.error('Error in logOut:', err.message)
      set({ error: err.message, isLoading: false })
    }
  },
  startAuthListener: () => {
    const subscription = subscribeToAuthChange((_event, session) => {
      set({ session })
    })
    set({ subscription })
  },
  stopAuthListener: () => {
    set(({ subscription }) => {
      subscription?.unsubscribe()
      return { subscription: null }
    })
  }
}))