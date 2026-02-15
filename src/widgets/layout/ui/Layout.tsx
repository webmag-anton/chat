import { ChatSidebar } from '@/widgets/chat-sidebar'
import { Chat } from '@/widgets/chat'
import { Sidebar, useSidebarStore } from '@/widgets/sidebar'
import { Overlay } from '@/shared/ui/overlay'
import { Toaster } from 'sonner'
import { EditProfileDialog } from '@/features/profile-edit'
import { useLastSeenHeartbeat } from '@/features/last-seen'
import { SignInDialog } from '@/features/sign-in'

export const Layout = () => {
  useLastSeenHeartbeat()

  const isSidebarOpen = useSidebarStore(s => s.isOpen)
  const closeSidebar = useSidebarStore(s => s.closeSidebar)

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

        <EditProfileDialog />
      </div>

      <Toaster />

      <SignInDialog />
    </>
  )
}