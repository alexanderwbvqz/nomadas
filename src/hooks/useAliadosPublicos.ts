import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Aliado } from '../types/admin'

export function useAliadosPublicos() {
  const [aliados, setAliados] = useState<Aliado[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    supabase
      .from('aliados')
      .select('id, logo, nombre, descripcion, tipo, linkedin, instagram, web')
      .eq('activo', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setAliados(data as Aliado[])
        setCargando(false)
      })
  }, [])

  return { aliados, cargando }
}
