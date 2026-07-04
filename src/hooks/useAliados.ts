import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
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
    const { data } = await supabase
      .from('aliados')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setAliados(
        data.map((a) => ({
          id: a.id,
          logo: a.logo ?? '',
          nombre: a.nombre,
          descripcion: a.descripcion,
          tipo: a.tipo as TipoAliado,
          activo: a.activo ?? false,
          linkedin: a.linkedin ?? undefined,
          instagram: a.instagram ?? undefined,
          web: a.web ?? undefined,

        }))
      )
    }
    setCargando(false)
  }

  async function toggleActivo(id: string, nuevoValor: boolean) {
    await supabase.from('aliados').update({ activo: nuevoValor }).eq('id', id)
    setAliados((prev) =>
      prev.map((a) => a.id === id ? { ...a, activo: nuevoValor } : a)
    )
  }

  async function guardar(actualizado: AliadoAdmin) {
    await supabase
      .from('aliados')
      .update({
        nombre: actualizado.nombre,
        logo: actualizado.logo || null,
        descripcion: actualizado.descripcion,
        tipo: actualizado.tipo,
        linkedin: actualizado.linkedin || null,
        instagram: actualizado.instagram || null,
        web: actualizado.web || null,
      })
      .eq('id', actualizado.id)

    setAliados((prev) =>
      prev.map((a) => a.id === actualizado.id ? { ...a, ...actualizado } : a)
    )
  }

  async function eliminar(id: string) {
    await supabase.from('aliados').delete().eq('id', id)
    setAliados((prev) => prev.filter((a) => a.id !== id))
  }

  return { aliados, cargando, toggleActivo, guardar, eliminar }
}
