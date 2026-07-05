import { supabase } from '../lib/supabase'

export async function getMetricas(): Promise<{ nomadas: number; aliados: number }> {
  const [perfiles, aliadosRes] = await Promise.all([
    supabase.from('perfiles_datos').select('id').eq('aprobado', true),
    supabase.from('aliados').select('id').eq('activo', true),
  ])
  return {
    nomadas: perfiles.data?.length ?? 0,
    aliados: aliadosRes.data?.length ?? 0,
  }
}
