import { Hamburger } from '@/shared/ui/hamburger'
import { useSidebarStore } from '@/widgets/sidebar'
import { Button } from '@/shared/ui/button'
import {
  useChatSidebarStore,
  type listTypeVariants
} from '../model/chatSidebarStore'

export const ChatSidebarHeader = () => {
  const openSidebarHandler = useSidebarStore(state => state.openSidebar)
  const { listType, toggleListType } = useChatSidebarStore()

  const nextListType: listTypeVariants =
    listType === 'profiles' ? 'chats' : 'profiles'
  const toggleButtonText = `show ${nextListType}`

  return (
    <div
      className='
        flex
        justify-between
        items-center
        h-[var(--headers-height)]
      '
    >
      <Hamburger onClick={openSidebarHandler} />
      <Button
        className='uppercase border-l-1 tracking-[2px]'
        horizontalPadding='sm'
        fullHeight
        square
        hasBorders={false}
        onClick={toggleListType}
      >
        {toggleButtonText}
      </Button>
    </div>
  )
}