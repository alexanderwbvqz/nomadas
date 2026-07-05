import { useEffect, useState } from 'react'
import { getAliadosPublicos } from '../api/aliados'
import type { Aliado } from '../types/admin'

export function useAliadosPublicos() {
  const [aliados, setAliados] = useState<Aliado[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getAliadosPublicos().then((data) => {
      setAliados(data)
      setCargando(false)
    })
  }, [])

  return { aliados, cargando }
}
