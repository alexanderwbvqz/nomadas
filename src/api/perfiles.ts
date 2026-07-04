import { supabase } from '../lib/supabase'
import type { OnboardingData } from '../types/onboarding'
import type { ResultadoPerfil } from '../types/onboarding'

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
