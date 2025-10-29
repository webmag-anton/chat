import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  fullWidth?: boolean
  fullHeight?: boolean
}

export const Input = (props: InputProps) => {
  const {
    type = 'text',
    className,
    fullWidth = false,
    fullHeight = false,
    ...otherProps
  } = props

  const inputClasses = clsx(
    'px-3',
    {
      'w-full': fullWidth,
      'h-full': fullHeight,
    },
    className
  )

  return (
    <input
      type={type}
      className={inputClasses}
      {...otherProps}
    />
  )
}

