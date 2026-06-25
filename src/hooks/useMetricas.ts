import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Metricas {
  nomadas: number
  aliados: number
  cargando: boolean
}

export function useMetricas(): Metricas {
  const [nomadas, setNomadas] = useState(0)
  const [aliados, setAliados] = useState(0)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('perfiles_datos').select('id').eq('aprobado', true),
      supabase.from('aliados').select('id').eq('activo', true),
    ]).then(([perfiles, aliadosRes]) => {
      setNomadas(perfiles.data?.length ?? 0)
      setAliados(aliadosRes.data?.length ?? 0)
      setCargando(false)
    })
  }, [])

  return { nomadas, aliados, cargando }
}
