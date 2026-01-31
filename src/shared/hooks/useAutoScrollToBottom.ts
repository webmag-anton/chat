import { useLayoutEffect, useRef } from 'react'

export const useAutoScrollToBottom = (dep: number) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    ref.current.scrollTop = ref.current.scrollHeight
  }, [dep])

  return ref
}