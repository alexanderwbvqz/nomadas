import { useEffect, useState } from 'react'
import { getEventoPublico, registrarAsistenciaPublica } from '../api/asistencia'
import type { TipoResultado, Evento } from '../types/asistencia'

type Estado = 'idle' | 'cargando' | TipoResultado | 'finalizado' | 'error'

export function useRegistroAsistencia(eventoId: string) {
  const [evento, setEvento] = useState<Evento | null>(null)
  const [cargandoEvento, setCargandoEvento] = useState(true)
  const [whatsapp, setWhatsapp] = useState('')
  const [estado, setEstado] = useState<Estado>('idle')
  const [nombreNomada, setNombreNomada] = useState('')

  useEffect(() => {
    getEventoPublico(eventoId).then((data) => {
      setEvento(data)
      if (data?.estado === 'finalizado') setEstado('finalizado')
      setCargandoEvento(false)
    })
  }, [eventoId])

  async function registrar() {
    if (!whatsapp.trim() || !evento) return
    setEstado('cargando')
    try {
      const resultado = await registrarAsistenciaPublica(evento.id, whatsapp.trim())
      setNombreNomada(resultado.nombre)
      setEstado(resultado.tipo)
    } catch {
      setEstado('error')
    }
  }

  return { evento, cargandoEvento, whatsapp, setWhatsapp, estado, nombreNomada, registrar }
}
