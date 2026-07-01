import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Metricas {
  nomadas: number
  aliados: number
}

export function useMetricas(): Metricas {
  const [nomadas, setNomadas] = useState(0)
  const [aliados, setAliados] = useState(0)

  useEffect(() => {
    async function cargar() {
      const [perfiles, aliadosRes] = await Promise.all([
        supabase.from('perfiles_datos').select('id').eq('aprobado', true),
        supabase.from('aliados').select('id').eq('activo', true),
      ])
      setNomadas(perfiles.data?.length ?? 0)
      setAliados(aliadosRes.data?.length ?? 0)
    }
    cargar()
  }, [])

  return { nomadas, aliados }
}
