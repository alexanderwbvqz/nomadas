import { useEffect, useState } from 'react'
import type { Cofundador } from '../types/perfiles'
import { getNomadas } from '../api/perfiles'

export function useNomadas() {
  const [cofundadores, setCofundadores] = useState<Cofundador[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getNomadas().then((lista) => {
      setCofundadores(lista)
      setCargando(false)
    })
  }, [])

  return { cofundadores, cargando }
}
