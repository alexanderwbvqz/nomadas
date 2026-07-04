import { useEffect, useState } from 'react'
import type { Inscrito } from '../types/admin'
import { getInscritos, aprobarInscrito, rechazarInscrito } from '../api/inscritos'
import { enviarCorreoAprobado, enviarCorreoRechazado } from '../api/correos'

export function useInscritos() {
  const [inscritos, setInscritos] = useState<Inscrito[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    setCargando(true)
    const lista = await getInscritos()
    setInscritos(lista)
    setCargando(false)
  }

  async function aprobar(id: string) {
    await aprobarInscrito(id)
    setInscritos((prev) =>
      prev.map((i) => i.id === id ? { ...i, estado: 'aprobado', observaciones: undefined } : i)
    )
    const inscrito = inscritos.find((i) => i.id === id)
    if (inscrito?.email) {
      enviarCorreoAprobado(inscrito.nombre, inscrito.email)
    }
  }

  async function rechazar(id: string, motivo: string) {
    await rechazarInscrito(id, motivo)
    setInscritos((prev) =>
      prev.map((i) => i.id === id ? { ...i, estado: 'rechazado', observaciones: motivo } : i)
    )
    const inscrito = inscritos.find((i) => i.id === id)
    if (inscrito?.email) {
      enviarCorreoRechazado(inscrito.nombre, inscrito.email, motivo)
    }
  }

  return { inscritos, cargando, aprobar, rechazar }
}
