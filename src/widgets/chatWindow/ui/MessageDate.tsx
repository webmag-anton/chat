export const MessageDate = ({ date }: { date: string }) => {
  return (
    <li
      className='
        self-center
        my-3
        px-2
        py-1
        bg-neutral-500
        text-sm
        text-white
        text-center
        rounded-2xl
      '
    >
      {date}
    </li>
  )
}