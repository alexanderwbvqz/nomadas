import { useEffect, useState } from 'react'
import { getSesionCeo, getResultadosDetalle, getRespuestasJugador, confirmarJugador } from '../api/sesionCeo'
import type { SesionCeo, ResultadoJugador, RespuestaDetalle } from '../types/sesionCeo'

export function useSesionCeoDetalle(sesionId: string) {
  const [sesion, setSesion] = useState<SesionCeo | null>(null)
  const [jugadores, setJugadores] = useState<ResultadoJugador[]>([])
  const [cargando, setCargando] = useState(true)
  const [respuestasModal, setRespuestasModal] = useState<{ nombre: string; respuestas: RespuestaDetalle[] } | null>(null)
  const [cargandoRespuestas, setCargandoRespuestas] = useState(false)

  useEffect(() => {
    async function cargar() {
      const [s, data] = await Promise.all([
        getSesionCeo(sesionId),
        getResultadosDetalle(sesionId),
      ])
      setSesion(s)
      setJugadores(data)
      setCargando(false)
    }
    cargar()
  }, [sesionId])

  async function verRespuestas(perfilId: string, nombre: string) {
    setCargandoRespuestas(true)
    const respuestas = await getRespuestasJugador(sesionId, perfilId)
    setRespuestasModal({ nombre, respuestas })
    setCargandoRespuestas(false)
  }

  async function confirmar(perfilId: string, valor: boolean | null) {
    await confirmarJugador(sesionId, perfilId, valor)
    setJugadores((prev) =>
      prev.map((j) => j.perfilId === perfilId ? { ...j, confirmado: valor } : j)
    )
  }

  function cerrarModal() {
    setRespuestasModal(null)
  }

  return {
    sesion,
    jugadores,
    cargando,
    respuestasModal,
    cargandoRespuestas,
    verRespuestas,
    confirmar,
    cerrarModal,
  }
}
