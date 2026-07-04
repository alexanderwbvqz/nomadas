import { useEffect, useState } from 'react'
import { getEventos, crearEvento, finalizarEvento, eliminarEvento, getConteoAsistencias } from '../api/asistencia'
import type { Evento } from '../types/asistencia'

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [conteos, setConteos] = useState<Record<string, number>>({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getEventos().then((data) => {
      setEventos(data)
      setCargando(false)
      data.forEach((ev) => {
        getConteoAsistencias(ev.id).then((n) =>
          setConteos((prev) => ({ ...prev, [ev.id]: n }))
        )
      })
    })
  }, [])

  async function crear(nombre: string, fecha: string): Promise<Evento | null> {
    const nuevo = await crearEvento(nombre, fecha)
    if (!nuevo) return null
    setEventos((prev) => [nuevo, ...prev])
    setConteos((prev) => ({ ...prev, [nuevo.id]: 0 }))
    return nuevo
  }

  async function finalizar(id: string) {
    await finalizarEvento(id)
    setEventos((prev) => prev.map((e) => e.id === id ? { ...e, estado: 'finalizado' } : e))
  }

  async function eliminar(id: string) {
    await eliminarEvento(id)
    setEventos((prev) => prev.filter((e) => e.id !== id))
    setConteos((prev) => { const next = { ...prev }; delete next[id]; return next })
  }

  return { eventos, conteos, cargando, crear, finalizar, eliminar }
}
