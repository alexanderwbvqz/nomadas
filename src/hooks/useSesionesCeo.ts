import { useEffect, useState } from 'react'
import { getSesionesCeo, crearSesionCeo, eliminarSesionCeo, enviarCorreosSesion } from '../api/sesionCeo'
import { buildJugadorCeoUrl } from '../utils/qr'
import type { SesionCeo } from '../types/sesionCeo'

export function useSesionesCeo() {
  const [sesiones, setSesiones] = useState<SesionCeo[]>([])
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState<string | null>(null)

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

  async function enviarCorreos(sesion: SesionCeo) {
    setEnviando(sesion.id)
    await enviarCorreosSesion(sesion.id, sesion.eventoId, buildJugadorCeoUrl(sesion.id))
    setEnviando(null)
  }

  return { sesiones, cargando, crear, eliminar, enviarCorreos, enviando }
}
