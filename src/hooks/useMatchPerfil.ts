import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface MatchPerfil {
  id: string
  nombre: string
  foto: string
  ocupacion: string
  categoria: string
  descripcion: string
  sueno: string
  tieneIdea: boolean
  pasiones: string[]
  superpoderes: string[]
  fraseRompeHielo: string
  whatsapp: string
  afinidad: number
}

export function useMatchPerfil(codigo: string) {
  const [perfil, setPerfil] = useState<MatchPerfil | null>(null)
  const [cargando, setCargando] = useState(true)
  const [noEncontrado, setNoEncontrado] = useState(false)

  useEffect(() => {
    if (!codigo) return
    cargar()
  }, [codigo])

  async function cargar() {
    setCargando(true)

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
      .eq('codigo_match', codigo)
      .single()

    if (!data) {
      setNoEncontrado(true)
      setCargando(false)
      return
    }

    type Resultado = Array<{ categoria: string; descripcion: string }>
    type Suenos = Array<{ sueno: string; tiene_idea: string }>
    type Pasiones = Array<{ pasion: string }>
    type Superpoderes = Array<{ superpoder: string }>
    type Tinder = Array<{ frase_representa: string }>

    const resultado = (data.perfil_resultado as Resultado)?.[0]
    const sueno = (data.perfil_suenos as Suenos)?.[0]
    const tinder = (data.perfil_tinder as Tinder)?.[0]

    setPerfil({
      id: data.id,
      nombre: data.nombre,
      foto: data.foto ?? '',
      ocupacion: data.ocupacion ?? '',
      whatsapp: data.whatsapp ?? '',
      categoria: resultado?.categoria ?? '',
      descripcion: resultado?.descripcion ?? '',
      sueno: sueno?.sueno ?? '',
      tieneIdea: sueno?.tiene_idea !== 'No',
      pasiones: (data.perfil_pasiones as Pasiones)?.map((p) => p.pasion) ?? [],
      superpoderes: (data.perfil_superpoderes as Superpoderes)?.map((s) => s.superpoder) ?? [],
      fraseRompeHielo: tinder?.frase_representa ?? '',
      afinidad: 0,
    })

    setCargando(false)
  }

  return { perfil, cargando, noEncontrado }
}
