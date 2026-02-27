import { create } from 'zustand'

interface sighInDialogState {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useSignInDialogStore = create<sighInDialogState>(
  ( set ) => ({
    open: false,
    setOpen: (open) => set({ open })
  })
)