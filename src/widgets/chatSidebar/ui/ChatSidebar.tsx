import { Hamburger } from '@/shared/ui/hamburger'
import { useSidebarStore } from '@/widgets/sidebar'
import { ProfilesList } from '@/features/profiles'

interface ChatSidebarProps {

}

export const ChatSidebar = (props: ChatSidebarProps) => {
  const {} = props

  const openSidebarHandler = useSidebarStore(state => state.openSidebar)

  return (
    <div className='basis-[400px] min-w-[400px] border-r'>
      <Hamburger onClick={openSidebarHandler} />

      <ProfilesList />
    </div>
  )
}