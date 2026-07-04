import { useEffect, useState } from 'react'
import type { MatchPerfil } from './useMatchPerfil'
import { distribuirPorSimilitud, distribuirMatches, type CandidatoConSimilitud } from '../lib/matchScore'
import { getCandidatosElegibles, getVectorMatches, getCandidatosPorIds } from '../api/match'

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

    const elegibles = await getCandidatosElegibles(owner.id)
    if (elegibles.length === 0) {
      setMatches([])
      setCargando(false)
      return
    }

    const vectorData = await getVectorMatches(owner.id, 50)
    const vectorFiltrado = vectorData.filter((r) => elegibles.includes(r.id))

    if (vectorFiltrado.length > 0) {
      await cargarPorVector(vectorFiltrado)
    } else {
      await cargarPorFormula(elegibles)
    }

    setCargando(false)
  }

  async function cargarPorVector(vectorData: { id: string; similarity: number }[]) {
    if (!owner) return
    const ids = vectorData.map((r) => r.id)
    const similarityMap = new Map(vectorData.map((r) => [r.id, r.similarity]))

    const data = await getCandidatosPorIds(ids)

    type Resultado = Array<{ categoria: string; descripcion: string }>
    type Suenos = Array<{ sueno: string; tiene_idea: string }>
    type Pasiones = Array<{ pasion: string }>
    type Superpoderes = Array<{ superpoder: string }>
    type Tinder = Array<{ frase_representa: string; pregunta_hielo: string }>

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
        preguntaHielo: tinder?.pregunta_hielo ?? '',
        afinidad: 0,
        similarity: similarityMap.get(p.id) ?? 0,
      }
    })

    setMatches(distribuirPorSimilitud(candidatos, owner.categoria))
  }

  async function cargarPorFormula(elegibles: string[]) {
    if (!owner) return

    const data = await getCandidatosPorIds(elegibles)

    type Resultado = Array<{ categoria: string; descripcion: string }>
    type Suenos = Array<{ sueno: string; tiene_idea: string }>
    type Pasiones = Array<{ pasion: string }>
    type Superpoderes = Array<{ superpoder: string }>
    type Tinder = Array<{ frase_representa: string; pregunta_hielo: string }>

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
        preguntaHielo: tinder?.pregunta_hielo ?? '',
        afinidad: 0,
      }
    })

    setMatches(distribuirMatches(candidatos, owner))
  }

  return { matches, cargando }
}
