import { Hamburger } from '@/shared/ui/hamburger/Hamburger.tsx'
import { useSidebarStore } from '@/widgets/sidebar/model/sidebarStore.ts'

interface RoomsProps {

}

export const Rooms = (props: RoomsProps) => {
  const {

  } = props

  const openSidebar = useSidebarStore(state => state.open)

  return (
    <div className='basis-[400px] min-w-[400px] border-r'>
      rooms widget
      <Hamburger onClick={openSidebar}/>
    </div>
  )
}