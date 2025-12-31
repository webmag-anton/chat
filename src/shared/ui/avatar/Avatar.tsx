import { Icon } from '@/shared/ui/icon'
import AvatarSvg from '@/shared/assets/icons/avatar.svg?react'
import clsx from 'clsx'

interface AvatarProps {
  url: string | null
  size?: number
  title?: string
  fill?: string
  className?: string
}

export const Avatar = ( props: AvatarProps ) => {
  const {
    url,
    size = 50,
    title = 'Avatar',
    fill = 'var(--color-main)',
    className
  } = props

  const imgClasses = clsx(
    'rounded-full object-cover aspect-square',
    className
  )

  return (
    url
      ? <img
          src={url}
          width={`${size}px`}
          height={size}
          className={imgClasses}
          alt={title}
        />
      : <Icon
          Svg={AvatarSvg}
          width={size}
          height={size}
          className={className}
          fill={fill}
          title={title}
      />
  )
}
