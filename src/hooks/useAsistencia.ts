import { useEffect, useState } from 'react'
import { getAsistencias, getEventoPublico, finalizarEvento } from '../api/asistencia'
import type { AsistenciaNomada, Evento } from '../types/asistencia'

export function useAsistencia(eventoId: string) {
  const [evento, setEvento] = useState<Evento | null>(null)
  const [asistencias, setAsistencias] = useState<AsistenciaNomada[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      const [ev, lista] = await Promise.all([
        getEventoPublico(eventoId),
        getAsistencias(eventoId),
      ])
      setEvento(ev)
      setAsistencias(lista)
      setCargando(false)
    }
    cargar()
  }, [eventoId])

  async function finalizar() {
    if (!evento) return
    await finalizarEvento(evento.id)
    setEvento((prev) => prev ? { ...prev, estado: 'finalizado' } : prev)
  }

  return { evento, asistencias, cargando, finalizar }
}
