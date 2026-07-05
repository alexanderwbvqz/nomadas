import { useEffect, useRef, useState } from 'react'
import { getSesionCeo, actualizarEstadoSesion, getJugadoresEnSala, getResultados, suscribirPantallaCeo } from '../api/sesionCeo'
import { getDinamicas } from '../api/dinamicas'
import type { SesionCeo, EstadoSesion, ResultadoJugador } from '../types/sesionCeo'
import type { Dinamica } from '../types/dinamicas'

export function usePantallaCeo(sesionId: string) {
  const [sesion, setSesion] = useState<SesionCeo | null>(null)
  const [dinamica, setDinamica] = useState<Dinamica | null>(null)
  const [jugadoresEnSala, setJugadoresEnSala] = useState(0)
  const [timer, setTimer] = useState(0)
  const [resultados, setResultados] = useState<ResultadoJugador[]>([])
  const [cargando, setCargando] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    async function cargar() {
      const s = await getSesionCeo(sesionId)
      if (!s) { setCargando(false); return }
      setSesion(s)

      const dinamicas = await getDinamicas()
      setDinamica(dinamicas.find((d) => d.id === s.dinamicaId) ?? null)

      setJugadoresEnSala(await getJugadoresEnSala(sesionId))

      if (s.estado === 'finalizado') {
        setResultados(await getResultados(sesionId))
      }

      setCargando(false)
    }
    cargar()

    return suscribirPantallaCeo(
      sesionId,
      (s) => setSesion((prev) => prev ? { ...prev, estado: s.estado as EstadoSesion, preguntaActual: s.pregunta_actual } : prev),
      () => setJugadoresEnSala((prev) => prev + 1),
    )
  }, [sesionId])

  function iniciarTimer(segundos: number, onFin: () => void) {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimer(segundos)
    let restante = segundos
    intervalRef.current = setInterval(() => {
      restante -= 1
      setTimer(restante)
      if (restante <= 0) { clearInterval(intervalRef.current!); onFin() }
    }, 1000)
  }

  async function iniciarJuego() {
    if (!sesion || !dinamica) return
    await actualizarEstadoSesion(sesionId, 'en_curso', 0)
    setSesion((prev) => prev ? { ...prev, estado: 'en_curso', preguntaActual: 0 } : prev)
    iniciarTimer(dinamica.tiempoRespuesta, () => avanzarPregunta(0))
  }

  async function avanzarPregunta(preguntaIndex: number) {
    if (!dinamica) return
    const siguiente = preguntaIndex + 1

    if (siguiente >= dinamica.preguntas.length) {
      await actualizarEstadoSesion(sesionId, 'finalizando')
      setSesion((prev) => prev ? { ...prev, estado: 'finalizando' } : prev)
      return
    }

    iniciarTimer(dinamica.tiempoPausa, async () => {
      await actualizarEstadoSesion(sesionId, 'en_curso', siguiente)
      setSesion((prev) => prev ? { ...prev, preguntaActual: siguiente } : prev)
      iniciarTimer(dinamica.tiempoRespuesta, () => avanzarPregunta(siguiente))
    })
  }

  async function mostrarResultados() {
    setResultados(await getResultados(sesionId))
    await actualizarEstadoSesion(sesionId, 'finalizado')
    setSesion((prev) => prev ? { ...prev, estado: 'finalizado' } : prev)
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const preguntaActual = dinamica?.preguntas[sesion?.preguntaActual ?? 0] ?? null

  return { sesion, dinamica, jugadoresEnSala, timer, resultados, cargando, preguntaActual, iniciarJuego, mostrarResultados }
}
