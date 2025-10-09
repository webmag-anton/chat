import { useSidebarStore } from '@/widgets/sidebar/model/sidebarStore.ts'

interface SidebarProps {

}

export const Sidebar = (props: SidebarProps) => {
  const {

  } = props

  const isOpen = useSidebarStore(state => state.isOpen)

  return (
    <aside className={`
      absolute 
      top-0 
      bottom-0 
      w-[400px] 
      max-w-screen 
      bg-amber-50 
      duration-150 
      ease
      z-2
      ${isOpen ? 'left-0' : '-left-full'}
    `}>
      Sidebar
    </aside>
  )
}