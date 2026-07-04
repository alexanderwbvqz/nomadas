import { supabase } from '../lib/supabase'
import type { OnboardingData, ResultadoPerfil } from '../types/onboarding'
import type { PerfilCompleto, RedPerfil, MatchPerfil, Cofundador } from '../types/perfiles'

export async function analizarPerfil(data: OnboardingData): Promise<ResultadoPerfil | null> {
  const { data: fnData, error } = await supabase.functions.invoke('analizar-perfil', { body: data })
  if (error || !fnData) return null
  return fnData as ResultadoPerfil
}

export async function existeEmail(email: string): Promise<boolean> {
  const { count } = await supabase
    .from('perfiles_datos')
    .select('id', { count: 'exact', head: true })
    .eq('email', email.trim().toLowerCase())
  return (count ?? 0) > 0
}

export async function existeWhatsapp(whatsapp: string): Promise<boolean> {
  const { count } = await supabase
    .from('perfiles_datos')
    .select('id', { count: 'exact', head: true })
    .eq('whatsapp', whatsapp.trim())
  return (count ?? 0) > 0
}

const PERFIL_COMPLETO_SELECT = `
  id, nombre, ocupacion, ocupacion_categoria, foto, email, whatsapp,
  perfil_suenos(sueno, tiene_idea, tiene_emprendimiento, detalle_emprendimiento),
  perfil_ideas(idea),
  perfil_resultado(categoria, descripcion),
  perfil_pasiones(pasion),
  perfil_superpoderes(superpoder),
  perfil_preferencias(perfiles_buscados, valores_importantes, disponibilidad),
  perfil_tinder(millon_dolares, problema_resolver, frase_representa, admira_emprendedor, mayor_aprendizaje),
  perfil_redes(red, url)
`

export async function getPerfilCompleto(id: string): Promise<PerfilCompleto | null> {
  const { data } = await supabase
    .from('perfiles_datos')
    .select(PERFIL_COMPLETO_SELECT)
    .eq('id', id)
    .single()

  if (!data) return null

  type Suenos = Array<{ sueno: string; tiene_idea: string; tiene_emprendimiento: string; detalle_emprendimiento: string }>
  type Ideas = Array<{ idea: string }>
  type Resultado = Array<{ categoria: string; descripcion: string }>
  type Pasiones = Array<{ pasion: string }>
  type Superpoderes = Array<{ superpoder: string }>
  type Preferencias = Array<{ perfiles_buscados: string[]; valores_importantes: string[]; disponibilidad: string }>
  type Tinder = Array<{ millon_dolares: string; problema_resolver: string; frase_representa: string; admira_emprendedor: string; mayor_aprendizaje: string }>
  type Redes = Array<{ red: string; url: string }>

  const suenos = (data.perfil_suenos as Suenos)?.[0]
  const resultado = (data.perfil_resultado as Resultado)?.[0]
  const pref = (data.perfil_preferencias as Preferencias)?.[0]
  const tinder = (data.perfil_tinder as Tinder)?.[0]

  return {
    id: data.id,
    nombre: data.nombre,
    ocupacion: data.ocupacion ?? '',
    ocupacionCategoria: data.ocupacion_categoria ?? '',
    foto: data.foto ?? '',
    email: data.email ?? '',
    whatsapp: data.whatsapp ?? '',
    sueno: suenos?.sueno ?? '',
    tieneIdea: suenos?.tiene_idea ?? '',
    ideas: (data.perfil_ideas as Ideas)?.map((i) => i.idea) ?? [],
    tieneEmprendimiento: suenos?.tiene_emprendimiento ?? '',
    detalleEmprendimiento: suenos?.detalle_emprendimiento ?? '',
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
    redes: (data.perfil_redes as Redes)?.map((r) => ({ red: r.red as RedPerfil['red'], url: r.url })) ?? [],
  }
}

export async function getNomadas(): Promise<Cofundador[]> {
  const { data: perfiles } = await supabase
    .from('perfiles_datos')
    .select('id, nombre, ocupacion, foto, whatsapp, perfil_resultado(categoria, descripcion), perfil_superpoderes(superpoder)')
    .eq('aprobado', true)
    .order('created_at', { ascending: false })

  if (!perfiles || perfiles.length === 0) return []

  type Resultado = Array<{ categoria: string; descripcion: string }>
  type Superpoderes = Array<{ superpoder: string }>

  return perfiles.map((p) => {
    const res = (p.perfil_resultado as Resultado)?.[0]
    return {
      id: p.id,
      nombre: p.nombre.split(' ').slice(0, 2).join(' '),
      ocupacion: p.ocupacion ?? '',
      foto: p.foto ?? '',
      whatsapp: p.whatsapp ?? '',
      categoria: res?.categoria ?? '',
      descripcion: res?.descripcion ?? '',
      superpoderes: (p.perfil_superpoderes as Superpoderes)?.map((s) => s.superpoder) ?? [],
    }
  })
}

const MATCH_PERFIL_SELECT = `
  id, nombre, foto, ocupacion, whatsapp,
  perfil_resultado(categoria, descripcion),
  perfil_suenos(sueno, tiene_idea),
  perfil_pasiones(pasion),
  perfil_superpoderes(superpoder),
  perfil_tinder(frase_representa, pregunta_hielo)
`

export async function getMatchPerfil(codigo: string): Promise<MatchPerfil | null> {
  const { data } = await supabase
    .from('perfiles_datos')
    .select(MATCH_PERFIL_SELECT)
    .eq('codigo_match', codigo)
    .single()

  if (!data) return null

  type Resultado = Array<{ categoria: string; descripcion: string }>
  type Suenos = Array<{ sueno: string; tiene_idea: string }>
  type Pasiones = Array<{ pasion: string }>
  type Superpoderes = Array<{ superpoder: string }>
  type Tinder = Array<{ frase_representa: string; pregunta_hielo: string }>

  const resultado = (data.perfil_resultado as Resultado)?.[0]
  const sueno = (data.perfil_suenos as Suenos)?.[0]
  const tinder = (data.perfil_tinder as Tinder)?.[0]

  return {
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
    preguntaHielo: tinder?.pregunta_hielo ?? '',
    afinidad: 0,
  }
}
