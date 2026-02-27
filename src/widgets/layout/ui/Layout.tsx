import { Suspense } from 'react'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { Chat } from '@/widgets/chat'
import { Sidebar, useSidebarStore } from '@/widgets/sidebar'
import { Overlay } from '@/shared/ui/overlay'
import { Toaster } from 'sonner'
import {
  EditProfileDialog,
  useProfileEditDialogStore
} from '@/features/profile-edit'
import { useLastSeenHeartbeat } from '@/features/last-seen'
import { SignInDialog, useSignInDialogStore } from '@/features/sign-in'
import { Spinner } from '@/shared/ui/shadcn/spinner'

const ScreenCenterSpinner = () => (
  <div
    className='
      fixed
      inset-0
      flex
      items-center
      justify-center
      bg-white/30
      backdrop-blur-sm
      z-2
    '
  >
    <Spinner className='size-8' />
  </div>
)

export const Layout = () => {
  useLastSeenHeartbeat()

  const isSidebarOpen = useSidebarStore(s => s.isOpen)
  const closeSidebar = useSidebarStore(s => s.closeSidebar)
  const isProfileEditDialogOpen  = useProfileEditDialogStore(s => s.open)
  const isSignInDialogOpen = useSignInDialogStore(s => s.open)

  return (
    <>
      <div
        className='
          relative
          w-screen
          h-dvh
          bg-white
          overflow-hidden
          md:max-w-7xl
          md:mx-auto
          md:shadow-[0_6px_12px_var(--color-accent)]
        '
      >
        <main
          className='
            fixed
            inset-0
            md:static
            md:h-dvh
            md:flex
          '
        >
          <ChatSidebar/>
          <Chat/>
        </main>

        <Sidebar/>

        <Overlay isShow={isSidebarOpen} onClick={closeSidebar}/>

        <Suspense fallback={<ScreenCenterSpinner />}>
          {isProfileEditDialogOpen && <EditProfileDialog />}
        </Suspense>
      </div>

      <Toaster />

      <Suspense fallback={<ScreenCenterSpinner />}>
        {isSignInDialogOpen && <SignInDialog />}
      </Suspense>
    </>
  )
}