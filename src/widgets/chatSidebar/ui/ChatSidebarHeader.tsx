import { Hamburger } from '@/shared/ui/hamburger'
import { useSidebarStore } from '@/widgets/sidebar'

export const ChatSidebarHeader = () => {
  const openSidebarHandler = useSidebarStore(state => state.openSidebar)

  return (
    <div className='flex justify-between items-center h-[50px] border-b'>
      <Hamburger onClick={openSidebarHandler} />
      <span>search</span>
      <span>chats btn</span>
    </div>
  )
}