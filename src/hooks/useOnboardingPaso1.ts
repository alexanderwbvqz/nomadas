import { useState } from 'react'
import type { OnboardingData } from '../types/onboarding'
import { validarNombre, validarEmail, validarWhatsapp, validarOcupacion } from '../validators/onboarding'
import { existeEmail, existeWhatsapp } from '../api/perfiles'

export type CampoPaso1 = 'nombre' | 'email' | 'whatsapp' | 'ocupacion'

function validarCampo(campo: CampoPaso1, valor: string): string {
  switch (campo) {
    case 'nombre':     return validarNombre(valor)
    case 'ocupacion':  return validarOcupacion(valor)
    case 'email':      return validarEmail(valor)
    case 'whatsapp':   return validarWhatsapp(valor)
  }
}

export function useOnboardingPaso1() {
  const [errores, setErrores] = useState<Partial<Record<CampoPaso1, string>>>({})
  const [tocados, setTocados] = useState<Partial<Record<CampoPaso1, boolean>>>({})

  async function handleBlur(campo: CampoPaso1, valor: string) {
    setTocados((prev) => ({ ...prev, [campo]: true }))
    if (campo === 'email') {
      const formatError = validarEmail(valor)
      if (formatError) { setErrores((prev) => ({ ...prev, email: formatError })); return }
      const existe = valor.trim() ? await existeEmail(valor) : false
      setErrores((prev) => ({ ...prev, email: existe ? 'Este correo ya está registrado' : '' }))
    } else if (campo === 'whatsapp') {
      const formatError = validarWhatsapp(valor)
      if (formatError) { setErrores((prev) => ({ ...prev, whatsapp: formatError })); return }
      const existe = valor.trim() ? await existeWhatsapp(valor) : false
      setErrores((prev) => ({ ...prev, whatsapp: existe ? 'Este número ya está registrado' : '' }))
    } else {
      setErrores((prev) => ({ ...prev, [campo]: validarCampo(campo, valor) }))
    }
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
