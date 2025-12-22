import { useAuthStore } from '@/features/authentication'
import { useSidebarStore } from '../model/sidebarStore'
import { Button } from '@/shared/ui/button'

export const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebarStore()
  const { logOut } = useAuthStore()

  const handleLogOut = () => {
    logOut()
    closeSidebar()
  }

  return (
    <aside className={`
      absolute 
      top-0 
      bottom-0 
      w-[var(--sidebar-width)] 
      max-w-screen 
      p-3
      bg-white
      duration-150 
      ease
      z-2
      ${isOpen ? 'left-0' : '-left-full'}
    `}>
      <Button onClick={handleLogOut}>Log out</Button>
    </aside>
  )
}