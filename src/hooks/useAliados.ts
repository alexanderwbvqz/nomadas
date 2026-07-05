import { useEffect, useState } from 'react'
import { getAliados, toggleActivoAliado, guardarAliado, eliminarAliado } from '../api/aliados'
import type { AliadoAdmin } from '../types/admin'

export type { AliadoAdmin }

export function useAliados() {
  const [aliados, setAliados] = useState<AliadoAdmin[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    setCargando(true)
    const data = await getAliados()
    setAliados(data)
    setCargando(false)
  }

  async function toggleActivo(id: string, nuevoValor: boolean) {
    await toggleActivoAliado(id, nuevoValor)
    setAliados((prev) => prev.map((a) => a.id === id ? { ...a, activo: nuevoValor } : a))
  }

  async function guardar(actualizado: AliadoAdmin) {
    await guardarAliado(actualizado)
    setAliados((prev) => prev.map((a) => a.id === actualizado.id ? { ...a, ...actualizado } : a))
  }

  async function eliminar(id: string) {
    await eliminarAliado(id)
    setAliados((prev) => prev.filter((a) => a.id !== id))
  }

  return { aliados, cargando, toggleActivo, guardar, eliminar }
}
