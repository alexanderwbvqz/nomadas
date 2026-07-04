// Validaciones puras del onboarding — funciones sincronas sin efectos secundarios

export function validarNombre(valor: string): string {
  return valor.trim() ? '' : 'El nombre es requerido'
}

export function validarOcupacion(valor: string): string {
  return valor.trim() ? '' : 'Selecciona o escribe tu ocupación'
}

export function validarEmail(valor: string): string {
  if (!valor.trim()) return ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())) return 'Ingresa un correo válido'
  return ''
}

export function validarWhatsapp(valor: string): string {
  if (!valor.trim()) return ''
  if (!/^\d{9}$/.test(valor.trim())) return 'Ingresa exactamente 9 dígitos'
  return ''
}


export function validarTextoLargo(valor: string, min = 15): string {
  if (!valor.trim()) return 'Este campo es requerido'
  if (valor.trim().length < min) return `Mínimo ${min} caracteres (${valor.trim().length}/${min})`
  return ''
}

export function validarPasiones(pasiones: string[]): string {
  if (pasiones.length === 0) return 'Selecciona al menos una pasión'
  return ''
}

export function validarSuperpoderes(superpoderes: string[]): string {
  if (superpoderes.length === 0) return 'Selecciona al menos un superpoder'
  return ''
}

export function validarUrl(url: string): string {
  if (!url.trim()) return ''
  try {
    new URL(url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`)
    return ''
  } catch {
    return 'Ingresa una URL válida'
  }
}

export function validarSueno(sueno: string): string {
  if (!sueno.trim()) return 'Selecciona tu sueño emprendedor'
  return ''
}
