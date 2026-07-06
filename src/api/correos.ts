import { supabase } from '../lib/supabase'

export async function enviarCorreoRegistro(nombre: string, email: string): Promise<void> {
  await supabase.functions.invoke('enviar-correo', {
    body: { tipo: 'registro', nombre, email },
  })
}

export async function enviarCorreoAprobado(nombre: string, email: string): Promise<void> {
  await supabase.functions.invoke('enviar-correo', {
    body: { tipo: 'aprobado', nombre, email },
  })
}

export async function enviarCorreoRechazado(nombre: string, email: string, motivo: string): Promise<void> {
  await supabase.functions.invoke('enviar-correo', {
    body: { tipo: 'rechazado', nombre, email, motivo },
  })
}

export async function enviarCorreoAliadoRegistro(nombre: string, email: string): Promise<void> {
  await supabase.functions.invoke('enviar-correo', {
    body: { tipo: 'aliado_registro', nombre, email },
  })
}
