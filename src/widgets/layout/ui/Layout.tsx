import type { PropsWithChildren } from 'react'
import { Rooms } from '@/widgets/rooms/ui/Rooms.tsx'
import { Chat } from '@/widgets/chat/ui/Chat.tsx'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar.tsx'
import { useSidebarStore } from '@/widgets/sidebar/model/sidebarStore.ts'
import { Overlay } from '@/shared/ui/overlay/Overlay.tsx'

interface LayoutProps extends PropsWithChildren {

}

export const Layout = (props: LayoutProps) => {
  const {

  } = props

  const isSidebarOpen = useSidebarStore((state) => state.isOpen)
  const closeSidebar = useSidebarStore((state) => state.close)

  return (
    <div className='relative'>
      <main className='flex h-screen'>
        <Rooms/>
        <Chat/>
      </main>
      <Sidebar/>
      {isSidebarOpen && <Overlay onClick={closeSidebar}/>}
    </div>
  )
}