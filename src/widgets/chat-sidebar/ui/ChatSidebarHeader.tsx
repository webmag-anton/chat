import { Hamburger } from '@/shared/ui/hamburger'
import { useSidebarStore } from '@/widgets/sidebar'
import { Button } from '@/shared/ui/button'
import {
  useChatSidebarStore,
  type listType
} from '@/features/load-chat-sidebar'
import { useSignInDialogStore, loadSignInDialog } from '@/features/sign-in'
import { useAuthStore } from '@/features/authentication'
import { loadEditProfileDialog } from '@/features/profile-edit'
import { Icon } from '@/shared/ui/icon'
import LoginSvg from '@/shared/assets/icons/login.svg?react'
import clsx from 'clsx'

export const ChatSidebarHeader = () => {
  const openSidebarHandler = useSidebarStore(s => s.openSidebar)
  const listType = useChatSidebarStore(s => s.listType)
  const toggleListType = useChatSidebarStore(s => s.toggleListType)

  const session = useAuthStore(s => s.session)
  const isAuthInitialized = useAuthStore(s => s.isInitialized)
  const setSignInDialogOpen = useSignInDialogStore(s => s.setOpen)

  let nextListType: listType
  if (session) {
    nextListType = listType === 'users' ? 'chats' : 'users'
  } else {
    nextListType = 'chats'
  }
  const toggleButtonText = `show ${nextListType}`

  const handleHamburgerClick = () => {
    if (session) {
      openSidebarHandler()
    } else {
      setSignInDialogOpen(true)
    }
  }

  const handleListTypeSwitcherClick = () => {
    if (session) {
      toggleListType()
    } else {
      setSignInDialogOpen(true)
    }
  }

  const handleHamburgerHover = () => {
    if (session) {
      loadEditProfileDialog()
    } else {
      loadSignInDialog()
    }
  }

  const handleChatsTogglerHover = () => {
    if (!session) {
      loadSignInDialog()
    }
  }

  const mainClasses = clsx(
    'flex justify-between items-center basis-[var(--headers-height)]',
    'shrink-0 py-1',
    session ? 'pr-3' : 'md:pr-3',
  )

  if (!isAuthInitialized) {
    return null
  }

  return (
    <div className={mainClasses}>
      <Hamburger
        onClick={handleHamburgerClick}
        onMouseEnter={handleHamburgerHover}
        onFocus={handleHamburgerHover}
      />
      <Button
        className='font-semibold uppercase tracking-[2px]'
        variant='secondary'
        horizontalPadding='sm'
        onMouseEnter={handleChatsTogglerHover}
        onFocus={handleChatsTogglerHover}
        onClick={handleListTypeSwitcherClick}
      >
        {toggleButtonText}
      </Button>

      {!session && <Button
        variant='transparent'
        className='text-main md:hidden'
        onMouseEnter={loadSignInDialog}
        onFocus={loadSignInDialog}
        onClick={() => setSignInDialogOpen(true)}
        horizontalPadding='lg'
        square
        hasBorders={false}
        fullHeight
      >
        <Icon
          Svg={LoginSvg}
          width={40}
          height={40}
          fill='var(--color-main)'
          title='log in'
        />
      </Button>}
    </div>
  )
}