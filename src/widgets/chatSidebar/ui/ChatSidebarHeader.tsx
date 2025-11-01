import { Hamburger } from '@/shared/ui/hamburger'
import { useSidebarStore } from '@/widgets/sidebar'
import { Button } from '@/shared/ui/button'

export const ChatSidebarHeader = () => {
  const openSidebarHandler = useSidebarStore(state => state.openSidebar)

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
      >
        show chats
      </Button>
    </div>
  )
}