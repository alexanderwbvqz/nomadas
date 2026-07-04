import { supabase } from '../lib/supabase'

const CANDIDATO_SELECT = `
  id, nombre, foto, ocupacion, whatsapp,
  perfil_resultado(categoria, descripcion),
  perfil_suenos(sueno, tiene_idea),
  perfil_pasiones(pasion),
  perfil_superpoderes(superpoder),
  perfil_tinder(frase_representa, pregunta_hielo)
`

export async function getCandidatosElegibles(excludeId: string): Promise<string[]> {
  const { data: evento } = await supabase
    .from('eventos')
    .select('id')
    .order('fecha', { ascending: false })
    .limit(1)
    .single()

  if (!evento) return []

  const { data: asistencias } = await supabase
    .from('asistencias')
    .select('perfil_id')
    .eq('evento_id', evento.id)
    .eq('asistio', true)

  if (!asistencias || asistencias.length === 0) return []

  return asistencias
    .map((a) => a.perfil_id as string)
    .filter((id) => id !== excludeId)
}

export async function getVectorMatches(ownerId: string, candidateCount: number): Promise<{ id: string; similarity: number }[]> {
  const { data } = await supabase.rpc('match_perfiles', {
    owner_id: ownerId,
    candidate_count: candidateCount,
  }) as { data: { id: string; similarity: number }[] | null }
  return data ?? []
}

export async function getCandidatosPorIds(ids: string[]) {
  if (ids.length === 0) return []
  const { data } = await supabase
    .from('perfiles_datos')
    .select(CANDIDATO_SELECT)
    .in('id', ids)
  return data ?? []
}
