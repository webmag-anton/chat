import { Hamburger } from '@/shared/ui/hamburger'
import { useSidebarStore } from '@/widgets/sidebar'
import { Button } from '@/shared/ui/button'
import {
  useChatSidebarStore,
  type listType
} from '@/features/load-chat-sidebar'
import { useSignInDialogState } from '@/features/sign-in'
import { useAuthStore } from '@/features/authentication'

export const ChatSidebarHeader = () => {
  const openSidebarHandler = useSidebarStore(s => s.openSidebar)
  const listType = useChatSidebarStore(s => s.listType)
  const toggleListType = useChatSidebarStore(s => s.toggleListType)

  const session = useAuthStore(s => s.session)
  const setSignInDialogOpen = useSignInDialogState(s => s.setOpen)

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

  return (
    <div
      className='
        flex
        justify-between
        items-center
        basis-[var(--headers-height)]
        shrink-0
        py-1
        pr-3
      '
    >
      <Hamburger onClick={handleHamburgerClick} />
      <Button
        className='font-semibold uppercase tracking-[2px]'
        variant='secondary'
        horizontalPadding='sm'
        onClick={handleListTypeSwitcherClick}
      >
        {toggleButtonText}
      </Button>
    </div>
  )
}