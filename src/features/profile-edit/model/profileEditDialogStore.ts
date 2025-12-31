import { create } from 'zustand'

interface profileEditDialogState {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useProfileEditDialogStore = create<profileEditDialogState>(
  ( set ) => ({
    open: false,
    setOpen: (open) => set({ open })
  })
)