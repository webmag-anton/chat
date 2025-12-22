import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  square?: boolean
  hasBorders?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  horizontalPadding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  verticalPadding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  children?: ReactNode
  addonLeft?: ReactNode
  addonRight?: ReactNode
  disabled?: boolean
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    square = false,
    hasBorders = true,
    fullWidth = false,
    fullHeight = false,
    horizontalPadding = 'md',
    verticalPadding = 'md',
    children,
    addonLeft,
    addonRight,
    disabled,
    ...otherProps
  } = props

  const paddingXMap = {
    none: 'px-0',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
    xl: 'px-8'
  }

  const paddingYMap = {
    none: 'py-0',
    sm: 'py-1',
    md: 'py-2',
    lg: 'py-3',
    xl: 'py-4'
  }

  const baseClasses = clsx(
    'flex items-center justify-center bg-accent cursor-pointer transition',
    'hover:bg-accent',
    {
      'rounded-xl': !square,
      'border-1 border-[var(--color-main)]': hasBorders,
      'w-full': fullWidth,
      'h-full': fullHeight,
      'opacity-50 pointer-events-none': disabled,
    },
    paddingXMap[horizontalPadding],
    paddingYMap[verticalPadding],
    className
  )

  return (
    <button
      className={baseClasses}
      disabled={disabled}
      {...otherProps}
    >
      {addonLeft && <span className="mr-2 flex items-center">{addonLeft}</span>}
      {children}
      {addonRight && <span className="ml-2 flex items-center">{addonRight}</span>}
    </button>
  )
}