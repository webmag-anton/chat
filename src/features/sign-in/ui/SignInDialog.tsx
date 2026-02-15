import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/shadcn/dialog'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/shared/api'
import { useSignInDialogState } from '../model/signInDialogStore'
import { useMessageStore } from '@/features/send-message'

export function SignInDialog() {
  const open = useSignInDialogState(s => s.open)
  const setOpen = useSignInDialogState(s => s.setOpen)
  const resetTextarea = useMessageStore(s => s.resetTextarea)

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          setOpen(false)
          resetTextarea()
        }
      }
    )

    return () => {
      subscription.subscription.unsubscribe()
    }
  }, [setOpen])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='hidden'>Authentication</DialogTitle>
        </DialogHeader>

        <Auth
          supabaseClient={supabase}
          providers={['github', 'google', 'linkedin']}
          appearance={{ theme: ThemeSupa }}
        />
      </DialogContent>
    </Dialog>
  )
}