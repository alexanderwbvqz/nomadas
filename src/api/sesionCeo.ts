import { supabase } from '../lib/supabase'
import type { SesionCeo, EstadoSesion, ResultadoJugador, RespuestaDetalle } from '../types/sesionCeo'

export async function getSesionesCeo(): Promise<SesionCeo[]> {
  const { data } = await supabase
    .from('sesiones_ceo')
    .select(`
      id, dinamica_id, evento_id, estado, pregunta_actual, created_at,
      dinamicas(nombre),
      eventos(nombre)
    `)
    .order('created_at', { ascending: false })

  if (!data) return []

  return data.map((s) => ({
    id: s.id,
    dinamicaId: s.dinamica_id,
    eventoId: s.evento_id,
    estado: s.estado as EstadoSesion,
    preguntaActual: s.pregunta_actual,
    createdAt: s.created_at,
    dinamicaNombre: (s.dinamicas as any)?.nombre ?? '',
    eventoNombre: (s.eventos as any)?.nombre ?? '',
  }))
}

export async function crearSesionCeo(dinamicaId: string, eventoId: string): Promise<SesionCeo | null> {
  const { data } = await supabase
    .from('sesiones_ceo')
    .insert({ dinamica_id: dinamicaId, evento_id: eventoId })
    .select(`
      id, dinamica_id, evento_id, estado, pregunta_actual, created_at,
      dinamicas(nombre),
      eventos(nombre)
    `)
    .single()

  if (!data) return null

  return {
    id: data.id,
    dinamicaId: data.dinamica_id,
    eventoId: data.evento_id,
    estado: data.estado as EstadoSesion,
    preguntaActual: data.pregunta_actual,
    createdAt: data.created_at,
    dinamicaNombre: (data.dinamicas as any)?.nombre ?? '',
    eventoNombre: (data.eventos as any)?.nombre ?? '',
  }
}

export async function eliminarSesionCeo(id: string): Promise<void> {
  await supabase.from('sesiones_ceo').delete().eq('id', id)
}

export async function getSesionCeo(id: string): Promise<SesionCeo | null> {
  const { data } = await supabase
    .from('sesiones_ceo')
    .select(`
      id, dinamica_id, evento_id, estado, pregunta_actual, created_at,
      dinamicas(nombre),
      eventos(nombre)
    `)
    .eq('id', id)
    .single()

  if (!data) return null

  return {
    id: data.id,
    dinamicaId: data.dinamica_id,
    eventoId: data.evento_id,
    estado: data.estado as EstadoSesion,
    preguntaActual: data.pregunta_actual,
    createdAt: data.created_at,
    dinamicaNombre: (data.dinamicas as any)?.nombre ?? '',
    eventoNombre: (data.eventos as any)?.nombre ?? '',
  }
}

export async function actualizarEstadoSesion(id: string, estado: EstadoSesion, preguntaActual?: number): Promise<void> {
  const update: Record<string, unknown> = { estado }
  if (preguntaActual !== undefined) update.pregunta_actual = preguntaActual
  await supabase.from('sesiones_ceo').update(update).eq('id', id)
}

export async function unirseComoJugador(sesionId: string, whatsapp: string): Promise<{ ok: boolean; error?: string; perfilId?: string }> {
  const { data: sesion } = await supabase
    .from('sesiones_ceo')
    .select('id, estado, evento_id')
    .eq('id', sesionId)
    .single()

  if (!sesion) return { ok: false, error: 'sesion_no_existe' }
  if (sesion.estado === 'finalizado') return { ok: false, error: 'finalizado' }

  const { data: perfil } = await supabase
    .from('perfiles_datos')
    .select('id, estado')
    .eq('whatsapp', whatsapp)
    .single()

  if (!perfil) return { ok: false, error: 'no_encontrado' }
  if (perfil.estado !== 'aprobado') return { ok: false, error: 'no_aprobado' }

  const { data: asistencia } = await supabase
    .from('asistencias')
    .select('id')
    .eq('evento_id', sesion.evento_id)
    .eq('perfil_id', perfil.id)
    .single()

  if (!asistencia) return { ok: false, error: 'no_asistio' }

  const { error } = await supabase
    .from('jugadores_ceo')
    .insert({ sesion_id: sesionId, perfil_id: perfil.id })

  if (error && error.code === '23505') return { ok: true, perfilId: perfil.id }
  if (error) return { ok: false, error: 'error' }

  return { ok: true, perfilId: perfil.id }
}

export async function registrarRespuesta(
  sesionId: string,
  perfilId: string,
  preguntaId: string,
  opcionId: string,
  peso: number
): Promise<void> {
  await supabase.from('respuestas_ceo').upsert(
    { sesion_id: sesionId, perfil_id: perfilId, pregunta_id: preguntaId, opcion_id: opcionId, peso },
    { onConflict: 'sesion_id,perfil_id,pregunta_id' }
  )
}

export async function getJugadoresEnSala(sesionId: string): Promise<number> {
  const { count } = await supabase
    .from('jugadores_ceo')
    .select('id', { count: 'exact', head: true })
    .eq('sesion_id', sesionId)
  return count ?? 0
}

export async function getResultados(sesionId: string): Promise<ResultadoJugador[]> {
  const { data } = await supabase
    .from('respuestas_ceo')
    .select(`
      perfil_id, peso,
      perfiles_datos(nombre, perfil_resultado(categoria))
    `)
    .eq('sesion_id', sesionId)

  if (!data) return []

  const mapa = new Map<string, ResultadoJugador>()

  for (const r of data) {
    const p = (r.perfiles_datos as any)
    const perfilId = r.perfil_id
    const nombre = p?.nombre ?? ''
    const categoria = p?.perfil_resultado?.[0]?.categoria ?? ''

    if (!mapa.has(perfilId)) {
      mapa.set(perfilId, { perfilId, nombre, categoria, puntaje: 0, confirmado: null })
    }
    mapa.get(perfilId)!.puntaje += Number(r.peso)
  }

  return Array.from(mapa.values()).sort((a, b) => b.puntaje - a.puntaje)
}

export async function getResultadosDetalle(sesionId: string): Promise<ResultadoJugador[]> {
  const [{ data: jugadores }, { data: respuestas }] = await Promise.all([
    supabase
      .from('jugadores_ceo')
      .select(`perfil_id, confirmado, perfiles_datos(nombre, perfil_resultado(categoria))`)
      .eq('sesion_id', sesionId),
    supabase
      .from('respuestas_ceo')
      .select('perfil_id, peso')
      .eq('sesion_id', sesionId),
  ])

  if (!jugadores) return []

  const puntajes = new Map<string, number>()
  for (const r of respuestas ?? []) {
    puntajes.set(r.perfil_id, (puntajes.get(r.perfil_id) ?? 0) + Number(r.peso))
  }

  return jugadores
    .map((j) => {
      const p = j.perfiles_datos as any
      return {
        perfilId: j.perfil_id,
        nombre: p?.nombre ?? '',
        categoria: p?.perfil_resultado?.[0]?.categoria ?? '',
        puntaje: puntajes.get(j.perfil_id) ?? 0,
        confirmado: j.confirmado ?? null,
      }
    })
    .sort((a, b) => b.puntaje - a.puntaje)
}

export async function getRespuestasJugador(sesionId: string, perfilId: string): Promise<RespuestaDetalle[]> {
  const { data } = await supabase
    .from('respuestas_ceo')
    .select(`
      preguntas_dinamica(texto),
      opciones_pregunta(texto)
    `)
    .eq('sesion_id', sesionId)
    .eq('perfil_id', perfilId)

  if (!data) return []

  return data.map((r) => ({
    preguntaTexto: (r.preguntas_dinamica as any)?.texto ?? '',
    opcionTexto: (r.opciones_pregunta as any)?.texto ?? '',
  }))
}

export async function confirmarJugador(sesionId: string, perfilId: string, confirmado: boolean | null): Promise<void> {
  await supabase
    .from('jugadores_ceo')
    .update({ confirmado })
    .eq('sesion_id', sesionId)
    .eq('perfil_id', perfilId)
}

export async function enviarCorreosSesion(sesionId: string, eventoId: string, url: string): Promise<void> {
  await supabase.functions.invoke('enviar-correo', {
    body: { tipo: 'ceo_invitacion', sesionId, eventoId, url },
  })
}

export function suscribirJugadorCeo(sesionId: string, onChange: (s: any) => void): () => void {
  const canal = supabase
    .channel(`jugador-ceo-${sesionId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'sesiones_ceo',
      filter: `id=eq.${sesionId}`,
    }, (payload) => onChange(payload.new))
    .subscribe()
  return () => supabase.removeChannel(canal)
}

export function suscribirPantallaCeo(
  sesionId: string,
  onSesionChange: (s: any) => void,
  onJugadorNuevo: () => void,
): () => void {
  const canal = supabase
    .channel(`pantalla-ceo-${sesionId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'sesiones_ceo',
      filter: `id=eq.${sesionId}`,
    }, (payload) => onSesionChange(payload.new))
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'jugadores_ceo',
      filter: `sesion_id=eq.${sesionId}`,
    }, () => onJugadorNuevo())
    .subscribe()
  return () => supabase.removeChannel(canal)
}
