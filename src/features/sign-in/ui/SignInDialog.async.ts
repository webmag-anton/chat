import { lazy } from 'react'

export const loadSignInDialog = () => import('./SignInDialog')

export const SignInDialogAsync = lazy(
  () => loadSignInDialog()
)