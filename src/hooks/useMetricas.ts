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
      supabase.from('perfiles_datos').select('*', { count: 'exact', head: true }).eq('aprobado', true),
      supabase.from('aliados').select('*', { count: 'exact', head: true }).eq('activo', true),
    ]).then(([perfiles, aliadosRes]) => {
      setNomadas(perfiles.count ?? 0)
      setAliados(aliadosRes.count ?? 0)
      setCargando(false)
    })
  }, [])

  return { nomadas, aliados, cargando }
}
