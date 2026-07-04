import { supabase } from '../lib/supabase'
import type { Evento, AsistenciaNomada, ResultadoRegistro, TipoResultado } from '../types/asistencia'

export async function getEventos(): Promise<Evento[]> {
  const { data } = await supabase
    .from('eventos')
    .select('id, nombre, fecha, estado, created_at')
    .order('created_at', { ascending: false })
  if (!data) return []
  return data.map((e) => ({
    id: e.id,
    nombre: e.nombre,
    fecha: e.fecha,
    estado: e.estado as Evento['estado'],
    createdAt: e.created_at,
  }))
}

export async function crearEvento(nombre: string, fecha: string): Promise<Evento | null> {
  const { data } = await supabase
    .from('eventos')
    .insert({ nombre, fecha })
    .select('id, nombre, fecha, estado, created_at')
    .single()
  if (!data) return null
  return { id: data.id, nombre: data.nombre, fecha: data.fecha, estado: data.estado, createdAt: data.created_at }
}

export async function finalizarEvento(id: string): Promise<void> {
  await supabase.from('eventos').update({ estado: 'finalizado' }).eq('id', id)
}

export async function eliminarEvento(id: string): Promise<void> {
  await supabase.from('eventos').delete().eq('id', id)
}

export async function getAsistencias(eventoId: string): Promise<AsistenciaNomada[]> {
  const { data } = await supabase
    .from('asistencias')
    .select(`
      perfil_id, created_at,
      perfiles_datos(nombre, whatsapp, foto, perfil_resultado(categoria))
    `)
    .eq('evento_id', eventoId)
    .order('created_at', { ascending: true })

  if (!data) return []

  return data.map((a) => {
    const p = (a.perfiles_datos as unknown) as { nombre: string; whatsapp: string; foto: string; perfil_resultado: Array<{ categoria: string }> } | null
    return {
      perfilId: a.perfil_id,
      nombre: p?.nombre ?? '',
      whatsapp: p?.whatsapp ?? '',
      foto: p?.foto ?? '',
      categoria: p?.perfil_resultado?.[0]?.categoria ?? '',
      registradoEn: a.created_at,
    }
  })
}

export async function toggleAsistencia(eventoId: string, perfilId: string, asistio: boolean): Promise<void> {
  await supabase
    .from('asistencias')
    .upsert({ evento_id: eventoId, perfil_id: perfilId, asistio }, { onConflict: 'evento_id,perfil_id' })
}

export async function getConteoAsistencias(eventoId: string): Promise<number> {
  const { count } = await supabase
    .from('asistencias')
    .select('id', { count: 'exact', head: true })
    .eq('evento_id', eventoId)
    .eq('asistio', true)
  return count ?? 0
}

export async function getEventoPublico(id: string): Promise<Evento | null> {
  const { data } = await supabase
    .from('eventos')
    .select('id, nombre, fecha, estado, created_at')
    .eq('id', id)
    .single()
  if (!data) return null
  return { id: data.id, nombre: data.nombre, fecha: data.fecha, estado: data.estado, createdAt: data.created_at }
}

export async function registrarAsistenciaPublica(
  eventoId: string,
  whatsapp: string
): Promise<ResultadoRegistro> {
  const { data: perfil } = await supabase
    .from('perfiles_datos')
    .select('id, estado, nombre')
    .eq('whatsapp', whatsapp)
    .single()

  if (!perfil) return { tipo: 'no_encontrado', nombre: '' }

  const primerNombre = perfil.nombre.split(' ')[0]

  if (perfil.estado === 'por_aprobar') return { tipo: 'por_aprobar', nombre: primerNombre }
  if (perfil.estado === 'rechazado') return { tipo: 'rechazado', nombre: primerNombre }

  const { data: asistenciaExistente } = await supabase
    .from('asistencias')
    .select('id')
    .eq('evento_id', eventoId)
    .eq('perfil_id', perfil.id)
    .single()

  if (asistenciaExistente) return { tipo: 'ya_registrado', nombre: primerNombre }

  await supabase
    .from('asistencias')
    .insert({ evento_id: eventoId, perfil_id: perfil.id, asistio: true })

  return { tipo: 'registrado', nombre: primerNombre }
}
