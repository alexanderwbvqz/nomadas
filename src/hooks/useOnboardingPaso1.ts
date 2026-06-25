import { useState } from 'react'
import type { OnboardingData } from '../types/onboarding'

export type CampoPaso1 = 'nombre' | 'email' | 'whatsapp' | 'ocupacion'

function validarCampo(campo: CampoPaso1, valor: string): string {
  switch (campo) {
    case 'nombre':
      return valor.trim() ? '' : 'El nombre es requerido'
    case 'ocupacion':
      return valor.trim() ? '' : 'Selecciona o escribe tu ocupación'
    case 'email':
      if (!valor.trim()) return ''
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())) return 'Ingresa un correo válido'
      return ''
    case 'whatsapp':
      if (!valor.trim()) return ''
      if (!/^\+?[\d\s\-()+]{7,}$/.test(valor.trim())) return 'Ingresa un número válido'
      return ''
  }
}

export function useOnboardingPaso1() {
  const [errores, setErrores] = useState<Partial<Record<CampoPaso1, string>>>({})
  const [tocados, setTocados] = useState<Partial<Record<CampoPaso1, boolean>>>({})

  function handleBlur(campo: CampoPaso1, valor: string) {
    setTocados((prev) => ({ ...prev, [campo]: true }))
    setErrores((prev) => ({ ...prev, [campo]: validarCampo(campo, valor) }))
  }

  function validarTodo(data: Pick<OnboardingData, CampoPaso1>): boolean {
    const campos: CampoPaso1[] = ['nombre', 'email', 'whatsapp', 'ocupacion']
    const nuevosErrores: Partial<Record<CampoPaso1, string>> = {}
    let hayErrores = false

    for (const campo of campos) {
      const msg = validarCampo(campo, data[campo])
      if (msg) {
        nuevosErrores[campo] = msg
        hayErrores = true
      }
    }

    setTocados({ nombre: true, email: true, whatsapp: true, ocupacion: true })
    setErrores(nuevosErrores)
    return !hayErrores
  }

  return { errores, tocados, handleBlur, validarTodo }
}
