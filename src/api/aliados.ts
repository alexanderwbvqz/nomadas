import { supabase } from '../lib/supabase'
import type { Aliado, AliadoAdmin } from '../types/admin'

export async function getAliados(): Promise<AliadoAdmin[]> {
  const { data } = await supabase
    .from('aliados')
    .select('*')
    .order('created_at', { ascending: false })

  if (!data) return []

  return data.map((a) => ({
    id: a.id,
    logo: a.logo ?? '',
    nombre: a.nombre,
    descripcion: a.descripcion,
    tipo: a.tipo,
    activo: a.activo ?? false,
    linkedin: a.linkedin ?? undefined,
    instagram: a.instagram ?? undefined,
    web: a.web ?? undefined,
  }))
}

export async function getAliadosPublicos(): Promise<Aliado[]> {
  const { data } = await supabase
    .from('aliados')
    .select('id, logo, nombre, descripcion, tipo, linkedin, instagram, web')
    .eq('activo', true)
    .order('created_at', { ascending: false })

  return (data as Aliado[]) ?? []
}

export async function toggleActivoAliado(id: string, activo: boolean): Promise<void> {
  await supabase.from('aliados').update({ activo }).eq('id', id)
}

export async function guardarAliado(aliado: AliadoAdmin): Promise<void> {
  await supabase
    .from('aliados')
    .update({
      nombre: aliado.nombre,
      logo: aliado.logo || null,
      descripcion: aliado.descripcion,
      tipo: aliado.tipo,
      linkedin: aliado.linkedin || null,
      instagram: aliado.instagram || null,
      web: aliado.web || null,
    })
    .eq('id', aliado.id)
}

export async function eliminarAliado(id: string): Promise<void> {
  await supabase.from('aliados').delete().eq('id', id)
}

export async function postularAliado(datos: {
  nombre: string
  logo: string | null
  tipo: string
  descripcion: string
  email: string | null
  linkedin: string | null
  instagram: string | null
  web: string | null
}): Promise<{ ok: boolean }> {
  const { error } = await supabase.from('aliados').insert({ ...datos, activo: false })
  return { ok: !error }
}

export async function subirLogoAliado(archivo: File): Promise<string | null> {
  const ext = archivo.name.split('.').pop()
  const nombre = `${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('aliados-logos')
    .upload(nombre, archivo, { upsert: true })

  if (error) return null

  const { data } = supabase.storage.from('aliados-logos').getPublicUrl(nombre)
  return data.publicUrl
}
