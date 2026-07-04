import { supabase } from '../lib/supabase'

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
