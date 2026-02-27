import { lazy } from 'react'

export const loadEditProfileDialog = () => import('./EditProfileDialog')

export const EditProfileDialogAsync = lazy(
  () => loadEditProfileDialog()
)