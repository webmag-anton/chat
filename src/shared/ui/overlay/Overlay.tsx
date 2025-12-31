import clsx from 'clsx'

interface OverlayProps {
  isShow: boolean
  onClick: () => void
}

export const Overlay = (props: OverlayProps) => {
  const {
    isShow,
    onClick
  } = props

  const baseClasses = clsx(
    'fixed inset-0 bg-black/70 z-[-1] opacity-0 duration-200 ease',
    {
      'opacity-100 z-[1]': isShow
    }
  )

  return (
    <div
      className={baseClasses}
      onClick={onClick}
    />
  )
}