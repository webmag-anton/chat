export const MessageDate = ({ date }: { date: string }) => {
  return (
    <li
      className='
        self-center
        mt-5
        mb-3
        px-2
        py-1
        bg-neutral-500
        text-sm
        text-text-reverted
        text-center
        rounded-2xl
      '
    >
      {date}
    </li>
  )
}