interface HamburgerProps {
  onClick?: () => void
  onMouseEnter?: () => void
  onFocus?: () => void
}

export const Hamburger = (props: HamburgerProps) => {
  const {
    onClick,
    onMouseEnter,
    onFocus
  } = props

  return (
    <div
      className='
        w-[50px]
        flex flex-col
        gap-[8px]
        p-[10px]
        cursor-pointer
        text-main
        hover:text-main-hover
        transition'
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
    >
      <span className='border-b-3'/>
      <span className='border-b-3'/>
      <span className='border-b-3'/>
    </div>
  )
}