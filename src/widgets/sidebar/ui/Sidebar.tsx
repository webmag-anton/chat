import { useSidebarStore } from '../model/sidebarStore'
import { useAuthStore } from '@/features/authentication'
import { useProfileEditDialogStore } from '@/features/profile-edit'
import { Button } from '@/shared/ui/button'

export const Sidebar = () => {
  const isSidebarOpen = useSidebarStore(s => s.isOpen)
  const closeSidebar = useSidebarStore(s => s.closeSidebar)
  const logOut = useAuthStore(s => s.logOut)
  const setProfileEditDialogOpen = useProfileEditDialogStore(s => s.setOpen)

  const handleProfileEdition = () => {
    setProfileEditDialogOpen(true)
    closeSidebar()
  }

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
      duration-200 
      ease
      z-2
      ${isSidebarOpen ? 'left-0' : '-left-[var(--sidebar-width)]'}
    `}>
      <Button onClick={handleProfileEdition}>My profile</Button>
      <Button onClick={handleLogOut}>Log out</Button>
    </aside>
  )
}