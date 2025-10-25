import type { FC, SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  Svg: FC<SVGProps<SVGSVGElement> & { title?: string }>
  title?: string
}

export const Icon = ({ Svg, ...otherProps }: IconProps) => {
  return <Svg {...otherProps} />
}
