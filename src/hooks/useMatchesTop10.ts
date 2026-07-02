import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { MatchPerfil } from './useMatchPerfil'
import { distribuirPorSimilitud, distribuirMatches, type CandidatoConSimilitud } from '../lib/matchScore'

export function useMatchesTop10(owner: MatchPerfil | null) {
  const [matches, setMatches] = useState<MatchPerfil[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!owner) return
    cargar()
  }, [owner?.id])

  async function cargar() {
    if (!owner) return
    setCargando(true)

    // Intentar búsqueda vectorial
    const { data: vectorData } = await supabase.rpc('match_perfiles', {
      owner_id: owner.id,
      candidate_count: 50,
    }) as { data: { id: string; similarity: number }[] | null }

    if (vectorData && vectorData.length > 0) {
      await cargarPorVector(vectorData)
    } else {
      await cargarPorFormula()
    }

    setCargando(false)
  }

  async function cargarPorVector(vectorData: { id: string; similarity: number }[]) {
    if (!owner) return
    const ids = vectorData.map((r) => r.id)
    const similarityMap = new Map(vectorData.map((r) => [r.id, r.similarity]))

    const { data } = await supabase
      .from('perfiles_datos')
      .select(`
        id, nombre, foto, ocupacion, whatsapp,
        perfil_resultado(categoria, descripcion),
        perfil_suenos(sueno, tiene_idea),
        perfil_pasiones(pasion),
        perfil_superpoderes(superpoder),
        perfil_tinder(frase_representa)
      `)
      .in('id', ids)

    if (!data) return

    type Resultado = Array<{ categoria: string; descripcion: string }>
    type Suenos = Array<{ sueno: string; tiene_idea: string }>
    type Pasiones = Array<{ pasion: string }>
    type Superpoderes = Array<{ superpoder: string }>
    type Tinder = Array<{ frase_representa: string }>

    const candidatos: CandidatoConSimilitud[] = data.map((p) => {
      const resultado = (p.perfil_resultado as Resultado)?.[0]
      const sueno = (p.perfil_suenos as Suenos)?.[0]
      const tinder = (p.perfil_tinder as Tinder)?.[0]

      return {
        id: p.id,
        nombre: p.nombre,
        foto: p.foto ?? '',
        ocupacion: p.ocupacion ?? '',
        whatsapp: p.whatsapp ?? '',
        categoria: resultado?.categoria ?? '',
        descripcion: resultado?.descripcion ?? '',
        sueno: sueno?.sueno ?? '',
        tieneIdea: sueno?.tiene_idea !== 'No',
        pasiones: (p.perfil_pasiones as Pasiones)?.map((x) => x.pasion) ?? [],
        superpoderes: (p.perfil_superpoderes as Superpoderes)?.map((s) => s.superpoder) ?? [],
        fraseRompeHielo: tinder?.frase_representa ?? '',
        afinidad: 0,
        similarity: similarityMap.get(p.id) ?? 0,
      }
    })

    setMatches(distribuirPorSimilitud(candidatos, owner.categoria))
  }

  async function cargarPorFormula() {
    if (!owner) return

    const { data } = await supabase
      .from('perfiles_datos')
      .select(`
        id, nombre, foto, ocupacion, whatsapp,
        perfil_resultado(categoria, descripcion),
        perfil_suenos(sueno, tiene_idea),
        perfil_pasiones(pasion),
        perfil_superpoderes(superpoder),
        perfil_tinder(frase_representa)
      `)
      .eq('aprobado', true)
      .neq('id', owner.id)

    if (!data) return

    type Resultado = Array<{ categoria: string; descripcion: string }>
    type Suenos = Array<{ sueno: string; tiene_idea: string }>
    type Pasiones = Array<{ pasion: string }>
    type Superpoderes = Array<{ superpoder: string }>
    type Tinder = Array<{ frase_representa: string }>

    const candidatos: MatchPerfil[] = data.map((p) => {
      const resultado = (p.perfil_resultado as Resultado)?.[0]
      const sueno = (p.perfil_suenos as Suenos)?.[0]
      const tinder = (p.perfil_tinder as Tinder)?.[0]

      return {
        id: p.id,
        nombre: p.nombre,
        foto: p.foto ?? '',
        ocupacion: p.ocupacion ?? '',
        whatsapp: p.whatsapp ?? '',
        categoria: resultado?.categoria ?? '',
        descripcion: resultado?.descripcion ?? '',
        sueno: sueno?.sueno ?? '',
        tieneIdea: sueno?.tiene_idea !== 'No',
        pasiones: (p.perfil_pasiones as Pasiones)?.map((x) => x.pasion) ?? [],
        superpoderes: (p.perfil_superpoderes as Superpoderes)?.map((s) => s.superpoder) ?? [],
        fraseRompeHielo: tinder?.frase_representa ?? '',
        afinidad: 0,
      }
    })

    setMatches(distribuirMatches(candidatos, owner))
  }

  return { matches, cargando }
}
