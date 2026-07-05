import { useEffect, useState } from 'react'
import { getSesionCeo, unirseComoJugador, registrarRespuesta, suscribirJugadorCeo } from '../api/sesionCeo'
import { getDinamica } from '../api/dinamicas'
import type { SesionCeo, EstadoJugador } from '../types/sesionCeo'
import type { Dinamica } from '../types/dinamicas'

export function useJugadorCeo(sesionId: string) {
  const [estado, setEstado] = useState<EstadoJugador>('idle')
  const [whatsapp, setWhatsapp] = useState('')
  const [sesion, setSesion] = useState<SesionCeo | null>(null)
  const [dinamica, setDinamica] = useState<Dinamica | null>(null)
  const [perfilId, setPerfilId] = useState<string | null>(null)
  const [respondido, setRespondido] = useState(false)

  useEffect(() => {
    getSesionCeo(sesionId).then(async (s) => {
      if (!s) { setEstado('sesion_no_existe'); return }
      if (s.estado === 'finalizado') { setEstado('finalizado'); return }
      setSesion(s)
      const d = await getDinamica(s.dinamicaId)
      setDinamica(d)
    })

    return suscribirJugadorCeo(sesionId, (s) => {
      setSesion((prev) => prev ? { ...prev, estado: s.estado, preguntaActual: s.pregunta_actual } : prev)
      if (s.estado === 'en_curso') { setEstado('en_curso'); setRespondido(false) }
      if (s.estado === 'finalizando') setEstado('finalizando')
      if (s.estado === 'finalizado') setEstado('finalizado')
    })
  }, [sesionId])

  async function unirse() {
    if (!whatsapp.trim()) return
    setEstado('cargando')
    const resultado = await unirseComoJugador(sesionId, whatsapp.trim())
    if (!resultado.ok) { setEstado(resultado.error as EstadoJugador); return }
    setPerfilId(resultado.perfilId ?? null)
    setEstado(sesion?.estado === 'en_curso' ? 'en_curso' : 'espera')
  }

  async function responder(preguntaId: string, opcionId: string, peso: number) {
    if (!perfilId || respondido) return
    setRespondido(true)
    await registrarRespuesta(sesionId, perfilId, preguntaId, opcionId, peso)
  }

  const preguntaActual = dinamica?.preguntas[sesion?.preguntaActual ?? 0] ?? null

  return { estado, whatsapp, setWhatsapp, sesion, dinamica, preguntaActual, perfilId, respondido, unirse, responder }
}
