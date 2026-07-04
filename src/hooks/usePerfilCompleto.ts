import { useEffect, useState } from 'react'
import type { PerfilCompleto } from '../types/perfiles'
import { getPerfilCompleto } from '../api/perfiles'

const cache = new Map<string, PerfilCompleto>()

export function usePerfilCompleto(id: string) {
  const [perfil, setPerfil] = useState<PerfilCompleto | null>(cache.get(id) ?? null)
  const [cargando, setCargando] = useState(!cache.has(id))

  useEffect(() => {
    if (cache.has(id)) return

    async function cargar() {
      const data = await getPerfilCompleto(id)
      if (!data) return
      cache.set(id, data)
      setPerfil(data)
      setCargando(false)
    }

    cargar()
  }, [id])

  return { perfil, cargando }
}
