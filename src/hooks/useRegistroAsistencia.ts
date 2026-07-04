import { useEffect, useState } from 'react'
import { getEventoPublico, registrarAsistenciaPublica } from '../api/asistencia'
import type { Evento } from '../types/asistencia'

type Estado = 'idle' | 'cargando' | 'registrado' | 'no_encontrado' | 'finalizado' | 'error'

export function useRegistroAsistencia(eventoId: string) {
  const [evento, setEvento] = useState<Evento | null>(null)
  const [cargandoEvento, setCargandoEvento] = useState(true)
  const [whatsapp, setWhatsapp] = useState('')
  const [estado, setEstado] = useState<Estado>('idle')

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
    const resultado = await registrarAsistenciaPublica(evento.id, whatsapp.trim())
    setEstado(resultado === 'registrado' ? 'registrado' : 'no_encontrado')
  }

  return { evento, cargandoEvento, whatsapp, setWhatsapp, estado, registrar }
}
