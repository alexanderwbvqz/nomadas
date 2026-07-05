import { useEffect, useState } from 'react'
import { getSesionesCeo, crearSesionCeo, eliminarSesionCeo } from '../api/sesionCeo'
import type { SesionCeo } from '../types/sesionCeo'

export function useSesionesCeo() {
  const [sesiones, setSesiones] = useState<SesionCeo[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getSesionesCeo().then((data) => {
      setSesiones(data)
      setCargando(false)
    })
  }, [])

  async function crear(dinamicaId: string, eventoId: string): Promise<SesionCeo | null> {
    const nueva = await crearSesionCeo(dinamicaId, eventoId)
    if (nueva) setSesiones((prev) => [nueva, ...prev])
    return nueva
  }

  async function eliminar(id: string) {
    await eliminarSesionCeo(id)
    setSesiones((prev) => prev.filter((s) => s.id !== id))
  }

  return { sesiones, cargando, crear, eliminar }
}
