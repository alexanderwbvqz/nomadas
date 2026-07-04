import { useEffect, useState } from 'react'
import type { MatchPerfil } from '../types/perfiles'
import { getMatchPerfil } from '../api/perfiles'

export type { MatchPerfil }

export function useMatchPerfil(codigo: string) {
  const [perfil, setPerfil] = useState<MatchPerfil | null>(null)
  const [cargando, setCargando] = useState(true)
  const [noEncontrado, setNoEncontrado] = useState(false)

  useEffect(() => {
    if (!codigo) return
    cargar()
  }, [codigo])

  async function cargar() {
    setCargando(true)
    const data = await getMatchPerfil(codigo)
    if (!data) {
      setNoEncontrado(true)
      setCargando(false)
      return
    }
    setPerfil(data)
    setCargando(false)
  }

  return { perfil, cargando, noEncontrado }
}
