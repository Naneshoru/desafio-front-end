import { useWindowSize } from '@uidotdev/usehooks'
import { useMemo } from 'react'

type SizeType = 'mobile' | 'web'

export default function useScreenSize( mobileWidth: number = 375) {
  const { width } = useWindowSize()
  const size: SizeType = useMemo(() => 
    (width ?? 0) <= mobileWidth ? 'mobile' : 'web'
  , [width, mobileWidth])

  return { size }
}
