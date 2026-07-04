import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Cofundador } from '../types/perfiles'

export function useNomadas() {
  const [cofundadores, setCofundadores] = useState<Cofundador[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      const { data: perfiles } = await supabase
        .from('perfiles_datos')
        .select('id, nombre, ocupacion, foto, whatsapp, perfil_resultado(categoria, descripcion), perfil_superpoderes(superpoder)')
        .eq('aprobado', true)
        .order('created_at', { ascending: false })

      if (!perfiles || perfiles.length === 0) {
        setCargando(false)
        return
      }

      type Resultado = Array<{ categoria: string; descripcion: string }>
      type Superpoderes = Array<{ superpoder: string }>

      setCofundadores(
        perfiles.map((p) => {
          const res = (p.perfil_resultado as Resultado)?.[0]
          return {
            id: p.id,
            nombre: p.nombre.split(' ').slice(0, 2).join(' '),
            ocupacion: p.ocupacion ?? '',
            foto: p.foto ?? '',
            categoria: res?.categoria ?? '',
            descripcion: res?.descripcion ?? '',
            superpoderes: (p.perfil_superpoderes as Superpoderes)?.map((s) => s.superpoder) ?? [],
            whatsapp: p.whatsapp ?? '',
          }
        })
      )
      setCargando(false)
    }

    cargar()
  }, [])

  return { cofundadores, cargando }
}
