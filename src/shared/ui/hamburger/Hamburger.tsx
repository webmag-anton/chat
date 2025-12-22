interface HamburgerProps {
  onClick: () => void
}

export const Hamburger = (props: HamburgerProps) => {
  const {
    onClick
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
    >
      <span className='border-b-3'/>
      <span className='border-b-3'/>
      <span className='border-b-3'/>
    </div>
  )
}