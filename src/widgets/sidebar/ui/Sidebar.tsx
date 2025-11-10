import { useAuthStore } from '@/features/authentication'
import { useSidebarStore } from '../model/sidebarStore'
import { Button } from '@/shared/ui/button'

export const Sidebar = () => {
  const isOpen = useSidebarStore(state => state.isOpen)
  const { logOut } = useAuthStore()

  return (
    <aside className={`
      absolute 
      top-0 
      bottom-0 
      w-[400px] 
      max-w-screen 
      p-3
      bg-amber-50 
      duration-150 
      ease
      z-2
      ${isOpen ? 'left-0' : '-left-full'}
    `}>
      <Button onClick={logOut}>Log out</Button>
    </aside>
  )
}