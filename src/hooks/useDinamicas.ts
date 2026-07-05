import { useEffect, useState } from 'react'
import { getDinamicas, crearDinamica, actualizarDinamica, eliminarDinamica } from '../api/dinamicas'
import type { Dinamica, DinamicaForm } from '../types/dinamicas'

export function useDinamicas() {
  const [dinamicas, setDinamicas] = useState<Dinamica[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getDinamicas().then((data) => {
      setDinamicas(data)
      setCargando(false)
    })
  }, [])

  async function crear(form: DinamicaForm) {
    await crearDinamica(form)
    const data = await getDinamicas()
    setDinamicas(data)
  }

  async function actualizar(id: string, form: DinamicaForm) {
    await actualizarDinamica(id, form)
    const data = await getDinamicas()
    setDinamicas(data)
  }

  async function eliminar(id: string) {
    await eliminarDinamica(id)
    setDinamicas((prev) => prev.filter((d) => d.id !== id))
  }

  return { dinamicas, cargando, crear, actualizar, eliminar }
}
