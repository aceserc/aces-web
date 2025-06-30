import { cn } from '@/lib/utils'
import Img from 'next-export-optimize-images/image'
import React from 'react'

type Props = React.ComponentProps<typeof Img>

const Image = ({ className, ...props }: Props) => {
  // @ts-expect-error : next-export-optimize-images/image does not have priority prop
  if (process.env.NODE_ENV === "development") return <img className={cn("bg-muted rounded-md", className)} {...props} />
  return <Img className={cn("bg-muted rounded-md", className)} {...props} />
}

export { Image }

