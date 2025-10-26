import { Icon } from '@/shared/ui/icon'
import AvatarSvg from '@/shared/assets/icons/avatar.svg?react'

interface AvatarProps {
  url: string | null
  size?: number
  title?: string
  className?: string
}

export const Avatar = ( props: AvatarProps ) => {
  const {
    url,
    size = 50,
    title = 'Avatar',
    className
  } = props

  return (
    url
      ? <img
          src={url}
          width={size}
          height={size}
          className='rounded-full object-cover aspect-square'
          alt={title}
        />
      : <Icon
          Svg={AvatarSvg}
          width={size}
          height={size}
          className={className}
          fill='brown'
          title={title}
      />
  )
}
