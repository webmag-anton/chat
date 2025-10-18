import { create } from 'zustand'
import type { Session, Subscription } from '@supabase/supabase-js'
import { getSession } from '../api/getSession.ts'
import { signOut } from '../api/signOut.ts'
import { subscribeToAuthChange } from '../api/subscribeToAuthChange.ts'

interface AuthState {
  session: Session | null
  isLoading: boolean
  error: string | null
  subscription: Subscription | null
  logIn: () => Promise<void>
  logOut: () => Promise<void>
  startAuthListener: () => void
  stopAuthListener: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: false,
  error: null,
  subscription: null,
  logIn: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await getSession()
      if (error) throw error
      set({ session: data.session, isLoading: false })
    } catch (err: any) {
      console.error('Error in logIn:', err.message)
      set({ error: err.message, isLoading: false })
    }
  },
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