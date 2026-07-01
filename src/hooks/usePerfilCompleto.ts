import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { PerfilCompleto } from '../components/ui/modalPerfil/modalPerfil.types'

const cache = new Map<string, PerfilCompleto>()

export function usePerfilCompleto(id: string) {
  const [perfil, setPerfil] = useState<PerfilCompleto | null>(cache.get(id) ?? null)
  const [cargando, setCargando] = useState(!cache.has(id))

  useEffect(() => {
    if (cache.has(id)) return

    async function cargar() {
      const { data } = await supabase
        .from('perfiles_datos')
        .select(`
          id, nombre, ocupacion, foto, email, whatsapp,
          perfil_suenos(sueno, tiene_idea),
          perfil_ideas(idea),
          perfil_resultado(categoria, descripcion),
          perfil_pasiones(pasion),
          perfil_superpoderes(superpoder),
          perfil_preferencias(perfiles_buscados, valores_importantes, disponibilidad),
          perfil_tinder(millon_dolares, problema_resolver, frase_representa, admira_emprendedor, mayor_aprendizaje)
        `)
        .eq('id', id)
        .single()

      if (!data) return

      type Suenos = Array<{ sueno: string; tiene_idea: string }>
      type Ideas = Array<{ idea: string }>
      type Resultado = Array<{ categoria: string; descripcion: string }>
      type Pasiones = Array<{ pasion: string }>
      type Superpoderes = Array<{ superpoder: string }>
      type Preferencias = Array<{ perfiles_buscados: string[]; valores_importantes: string[]; disponibilidad: string }>
      type Tinder = Array<{ millon_dolares: string; problema_resolver: string; frase_representa: string; admira_emprendedor: string; mayor_aprendizaje: string }>

      const suenos = (data.perfil_suenos as Suenos)?.[0]
      const resultado = (data.perfil_resultado as Resultado)?.[0]
      const pref = (data.perfil_preferencias as Preferencias)?.[0]
      const tinder = (data.perfil_tinder as Tinder)?.[0]

      const mapped: PerfilCompleto = {
        id: data.id,
        nombre: data.nombre,
        ocupacion: data.ocupacion ?? '',
        foto: data.foto ?? '',
        email: data.email ?? '',
        whatsapp: data.whatsapp ?? '',
        sueno: suenos?.sueno ?? '',
        tieneIdea: suenos?.tiene_idea ?? '',
        ideas: (data.perfil_ideas as Ideas)?.map((i) => i.idea) ?? [],
        categoria: resultado?.categoria ?? '',
        descripcion: resultado?.descripcion ?? '',
        pasiones: (data.perfil_pasiones as Pasiones)?.map((p) => p.pasion) ?? [],
        superpoderes: (data.perfil_superpoderes as Superpoderes)?.map((s) => s.superpoder) ?? [],
        perfilesBuscados: pref?.perfiles_buscados ?? [],
        valoresImportantes: pref?.valores_importantes ?? [],
        disponibilidad: pref?.disponibilidad ?? '',
        millonDolares: tinder?.millon_dolares ?? '',
        problemaResolver: tinder?.problema_resolver ?? '',
        fraseRepresenta: tinder?.frase_representa ?? '',
        admiraEmprendedor: tinder?.admira_emprendedor ?? '',
        mayorAprendizaje: tinder?.mayor_aprendizaje ?? '',
      }

      cache.set(id, mapped)
      setPerfil(mapped)
      setCargando(false)
    }

    cargar()
  }, [id])

  return { perfil, cargando }
}
