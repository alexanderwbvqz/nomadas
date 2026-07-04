import { useEffect, useState } from 'react'

export type Breakpoint = 'mobile' | 'tablet' | 'lg' | 'xl'

function calcular(width: number): Breakpoint {
  if (width >= 1280) return 'xl'
  if (width >= 1024) return 'lg'
  if (width >= 768) return 'tablet'
  return 'mobile'
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(() => calcular(window.innerWidth))

  useEffect(() => {
    const handler = () => setBp(calcular(window.innerWidth))
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return bp
}
