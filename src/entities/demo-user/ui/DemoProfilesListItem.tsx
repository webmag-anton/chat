import { Avatar } from '@/shared/ui/avatar'
import type { DemoUser } from '../types'
import { useSignInDialogState } from '@/features/sign-in'
import clsx from 'clsx'

interface ProfilesListItemProps {
  userData: DemoUser
}

export const DemoProfilesListItem = ({ userData }: ProfilesListItemProps) => {
  const {
    username,
    avatar,
    online
  } = userData

  const setSignInDialogOpen = useSignInDialogState(s => s.setOpen)

  const baseClasses = clsx(
    'flex pl-8 pr-3 py-2 transition cursor-pointer hover:bg-accent'
  )

  const onlineStatusClasses = clsx(
    'shrink-0 inline-block w-[10px] h-[10px] rounded-full mr-2',
    online ? 'bg-green-600' : 'bg-[#b5b5b5]'
  )

  return (
    <li
      className={baseClasses}
      onClick={() => setSignInDialogOpen(true)}
    >
      <Avatar
        url={avatar}
        className='mr-3'
        size={60}
        title="User's avatar"
      />

      <span className='text-lg'>
        <span className={onlineStatusClasses} />
        {username}
      </span>
    </li>
  )
}