import { ChatSidebar } from '@/widgets/chat-sidebar'
import { Chat } from '@/widgets/chat'
import { Sidebar, useSidebarStore } from '@/widgets/sidebar'
import { Overlay } from '@/shared/ui/overlay'
import { Toaster } from 'sonner'
import { EditProfileDialog } from '@/features/profile-edit'

export const Layout = () => {
  const isSidebarOpen = useSidebarStore(s => s.isOpen)
  const closeSidebar = useSidebarStore(s => s.closeSidebar)

  return (
    <>
      <div className='
      relative
      max-w-7xl
      mx-auto
      bg-white
      shadow-[0_6px_12px_var(--color-accent)]
      overflow-hidden'
      >
        <main className='flex h-screen'>
          <ChatSidebar/>
          <Chat/>
        </main>

        <Sidebar/>

        <Overlay isShow={isSidebarOpen} onClick={closeSidebar}/>

        <EditProfileDialog />
      </div>

      <Toaster />
    </>
  )
}