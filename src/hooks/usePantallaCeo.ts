import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getSesionCeo, actualizarEstadoSesion, getJugadoresEnSala, getResultados } from '../api/sesionCeo'
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
      const d = dinamicas.find((d) => d.id === s.dinamicaId) ?? null
      setDinamica(d)

      const conteo = await getJugadoresEnSala(sesionId)
      setJugadoresEnSala(conteo)
      setCargando(false)
    }
    cargar()

    const canal = supabase
      .channel(`pantalla-ceo-${sesionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'sesiones_ceo',
        filter: `id=eq.${sesionId}`,
      }, (payload) => {
        const s = payload.new as any
        setSesion((prev) => prev ? {
          ...prev,
          estado: s.estado as EstadoSesion,
          preguntaActual: s.pregunta_actual,
        } : prev)
      })
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'jugadores_ceo',
        filter: `sesion_id=eq.${sesionId}`,
      }, () => {
        setJugadoresEnSala((prev) => prev + 1)
      })
      .subscribe()

    return () => { supabase.removeChannel(canal) }
  }, [sesionId])

  function iniciarTimer(segundos: number, onFin: () => void) {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimer(segundos)
    let restante = segundos
    intervalRef.current = setInterval(() => {
      restante -= 1
      setTimer(restante)
      if (restante <= 0) {
        clearInterval(intervalRef.current!)
        onFin()
      }
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
    const data = await getResultados(sesionId)
    setResultados(data)
    await actualizarEstadoSesion(sesionId, 'finalizado')
    setSesion((prev) => prev ? { ...prev, estado: 'finalizado' } : prev)
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const preguntaActual = dinamica?.preguntas[sesion?.preguntaActual ?? 0] ?? null

  return {
    sesion,
    dinamica,
    jugadoresEnSala,
    timer,
    resultados,
    cargando,
    preguntaActual,
    iniciarJuego,
    mostrarResultados,
  }
}
