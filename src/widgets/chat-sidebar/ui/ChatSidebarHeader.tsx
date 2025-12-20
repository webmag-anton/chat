import { Hamburger } from '@/shared/ui/hamburger'
import { useSidebarStore } from '@/widgets/sidebar'
import { Button } from '@/shared/ui/button'
import { useChatSidebarStore } from '../model/chatSidebarStore'
import type { listType } from '../types'

export const ChatSidebarHeader = () => {
  const openSidebarHandler = useSidebarStore(state => state.openSidebar)
  const { listType, toggleListType } = useChatSidebarStore()

  const nextListType: listType =
    listType === 'users' ? 'chats' : 'users'
  const toggleButtonText = `show ${nextListType}`

  return (
    <div
      className='
        flex
        justify-between
        items-center
        basis-[var(--headers-height)]
        shrink-0
      '
    >
      <Hamburger onClick={openSidebarHandler} />
      <Button
        className='border-l-1 font-semibold text-[#072c82] uppercase tracking-[2px]'
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