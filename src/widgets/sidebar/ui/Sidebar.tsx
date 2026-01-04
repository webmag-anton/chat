import { useSidebarStore } from '../model/sidebarStore'
import { useAuthStore } from '@/features/authentication'
import {
  useLoggedInUserProfile,
  useProfileEditDialogStore
} from '@/features/profile-edit'
import { Button } from '@/shared/ui/button'
import { Avatar } from '@/shared/ui/avatar'
import { Icon } from '@/shared/ui/icon'
import { getPublicAvatarUrl } from '@/shared/lib'
import LogoutSvg from '@/shared/assets/icons/logout.svg?react'
import clsx from 'clsx'

const NAV_ICONS_SIZE = 34

export const Sidebar = () => {
  const isSidebarOpen = useSidebarStore(s => s.isOpen)
  const closeSidebar = useSidebarStore(s => s.closeSidebar)
  const session = useAuthStore(s => s.session)
  const logOut = useAuthStore(s => s.logOut)
  const setProfileEditDialogOpen = useProfileEditDialogStore(s => s.setOpen)

  const { data: loggedInUserData }
    = useLoggedInUserProfile(session?.user?.id ?? '')

  const avatar = getPublicAvatarUrl(
    loggedInUserData?.avatar, loggedInUserData?.avatar_version
  )
  const userName
    = loggedInUserData?.username ?? loggedInUserData?.email

  const handleProfileEdition = () => {
    setProfileEditDialogOpen(true)
    closeSidebar()
  }

  const handleLogOut = () => {
    logOut()
    closeSidebar()
  }

  const avatarClasses = clsx(
    'mb-2',
    {
      'border-4 border-[var(--color-main-hover)]': !!avatar,
    }
  )

  return (
    <aside className={`
      absolute 
      top-0 
      bottom-0 
      w-[var(--sidebar-width)] 
      max-w-screen 
      py-3
      bg-white
      duration-200 
      ease
      z-2
      ${isSidebarOpen ? 'left-0' : '-left-[var(--sidebar-width)]'}
    `}>
      <div className='pl-4 mb-6'>
        <Avatar
          url={avatar}
          size={70}
          title='my avatar'
          className={avatarClasses}
          fill='var(--color-main-hover)'
        />
        <h3>{userName}</h3>
      </div>

      <nav>
        <ul>
          <li>
            <Button
              fullWidth
              transparent
              verticalPadding='lg'
              square
              hasBorders={false}
              centered={false}
              addonLeft={
                <Avatar
                  url={null}
                  className='mr-2'
                  size={NAV_ICONS_SIZE}
                  title='my avatar'
                />
              }
              onClick={handleProfileEdition}
            >
              My Profile
            </Button>
          </li>
          <li>
            <Button
              fullWidth
              transparent
              verticalPadding='lg'
              square
              hasBorders={false}
              centered={false}
              addonLeft={
                <Icon
                  Svg={LogoutSvg}
                  width={NAV_ICONS_SIZE}
                  height={NAV_ICONS_SIZE}
                  className='mr-2'
                  stroke='var(--color-main)'
                  title='log out'
                />
              }
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}