import { useChatStore } from '@/entities/chat'
import { useOpponentLastSeen } from '@/features/last-seen'
import { useAuthStore } from '@/features/authentication'
import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import ArrowLeftSvg from '@/shared/assets/icons/left-arrow.svg?react'
import { useSignInDialogState } from '@/features/sign-in'
import LoginSvg from '@/shared/assets/icons/login.svg?react'

export const ChatHeader = () => {
  const currentOpponentName = useChatStore(s => s.currentOpponentName)
  const currentOpponentId = useChatStore(s => s.currentOpponentId)
  const clearActiveChat = useChatStore(s => s.clearActiveChat)
  const session = useAuthStore(s => s.session)

  const lastSeenText = useOpponentLastSeen(currentOpponentId)

  const setSignInDialogOpen = useSignInDialogState(s => s.setOpen)

  return (
    <div
      className='
        flex
        basis-[var(--headers-height)]
        border-text-reverted
        bg-blue
        md:border-l
      '
    >
      <Button
        variant='transparent'
        className='text-main md:hidden'
        onClick={clearActiveChat}
        horizontalPadding='lg'
        square
        hasBorders={false}
        fullHeight
      >
        <Icon
          Svg={ArrowLeftSvg}
          width={32}
          height={32}
          fill='currentColor'
        />
      </Button>

      <div
        className='
          grow
          flex
          flex-col
          justify-between
          max-h-[var(--headers-height)]
          shrink-0
          px-3
          py-[2px]
          bg-bg-main
          sm:px-5
          md:max-w-none
        '
      >
        <span
          className='
            font-bold
            text-base
            tracking-wider
            truncate
            sm:text-lg
          '
        >
          {currentOpponentName}
        </span>
        {currentOpponentId
          ? <span>{lastSeenText}</span>
          : null
        }
      </div>

      {!session && <Button
          variant='transparent'
          className='text-main'
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
        </Button>
      }
    </div>
  )
}