import { Hamburger } from '@/shared/ui/hamburger'
import { useSidebarStore } from '@/widgets/sidebar'
import { Button } from '@/shared/ui/button'
import {
  useChatSidebarStore,
  type listType
} from '@/features/load-chat-sidebar'

export const ChatSidebarHeader = () => {
  const openSidebarHandler = useSidebarStore(s => s.openSidebar)
  const listType = useChatSidebarStore(s => s.listType)
  const toggleListType = useChatSidebarStore(s => s.toggleListType)

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
        py-1
        pr-3
      '
    >
      <Hamburger onClick={openSidebarHandler} />
      <Button
        className='font-semibold uppercase tracking-[2px]'
        variant='secondary'
        horizontalPadding='sm'
        onClick={toggleListType}
      >
        {toggleButtonText}
      </Button>
    </div>
  )
}