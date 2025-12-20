import { ChatSidebar } from '@/widgets/chat-sidebar'
import { Chat } from '@/widgets/chat'
import { Sidebar, useSidebarStore } from '@/widgets/sidebar'
import { Overlay } from '@/shared/ui/overlay'
import { Toaster } from 'sonner'

export const Layout = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isOpen)
  const closeSidebarHandler = useSidebarStore((state) => state.closeSidebar)

  return (
    <>
      <div className='
      relative
      max-w-7xl
      mx-auto
      border-x
      bg-white
      overflow-hidden'
      >
        <main className='flex h-screen'>
          <ChatSidebar/>
          <Chat/>
        </main>

        <Sidebar/>

        {isSidebarOpen && <Overlay onClick={closeSidebarHandler}/>}
      </div>

      <Toaster />
    </>
  )
}