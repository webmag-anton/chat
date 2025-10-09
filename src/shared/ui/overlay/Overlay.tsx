interface OverlayProps {
  onClick: () => void
}

export const Overlay = (props: OverlayProps) => {
  const {
    onClick
  } = props

  return (
    <div
      className='
        fixed
        inset-0
        bg-black/70
        z-[1]'
      onClick={onClick}
    />
  )
}