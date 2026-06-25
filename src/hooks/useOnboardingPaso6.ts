import { useState } from 'react'
import type { OnboardingData } from '../types/onboarding'

export type CampoPaso6 = 'millonDolares' | 'problemaResolver' | 'fraseRepresenta' | 'admiraEmprendedor' | 'mayorAprendizaje'

const MIN = 15

function validarCampo(_campo: CampoPaso6, valor: string): string {
  if (!valor.trim()) return 'Este campo es requerido'
  if (valor.trim().length < MIN) return `Mínimo ${MIN} caracteres (${valor.trim().length}/${MIN})`
  return ''
}

export function useOnboardingPaso6() {
  const [errores, setErrores] = useState<Partial<Record<CampoPaso6, string>>>({})
  const [tocados, setTocados] = useState<Partial<Record<CampoPaso6, boolean>>>({})

  function handleBlur(campo: CampoPaso6, valor: string) {
    setTocados((prev) => ({ ...prev, [campo]: true }))
    setErrores((prev) => ({ ...prev, [campo]: validarCampo(campo, valor) }))
  }

  function validarTodo(data: Pick<OnboardingData, CampoPaso6>): boolean {
    const campos: CampoPaso6[] = ['millonDolares', 'problemaResolver', 'fraseRepresenta', 'admiraEmprendedor', 'mayorAprendizaje']
    const nuevosErrores: Partial<Record<CampoPaso6, string>> = {}
    let hayErrores = false

    for (const campo of campos) {
      const msg = validarCampo(campo, data[campo])
      if (msg) {
        nuevosErrores[campo] = msg
        hayErrores = true
      }
    }

    setTocados({ millonDolares: true, problemaResolver: true, fraseRepresenta: true, admiraEmprendedor: true, mayorAprendizaje: true })
    setErrores(nuevosErrores)
    return !hayErrores
  }

  return { errores, tocados, handleBlur, validarTodo }
}
