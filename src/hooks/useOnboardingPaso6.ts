import { useState } from 'react'
import type { OnboardingData } from '../types/onboarding'
import { validarTextoLargo } from '../validators/onboarding'

export type CampoPaso6 = 'millonDolares' | 'problemaResolver' | 'fraseRepresenta' | 'admiraEmprendedor' | 'mayorAprendizaje'

export function useOnboardingPaso6() {
  const [errores, setErrores] = useState<Partial<Record<CampoPaso6, string>>>({})
  const [tocados, setTocados] = useState<Partial<Record<CampoPaso6, boolean>>>({})

  function handleBlur(campo: CampoPaso6, valor: string) {
    setTocados((prev) => ({ ...prev, [campo]: true }))
    setErrores((prev) => ({ ...prev, [campo]: validarTextoLargo(valor) }))
  }

  function validarTodo(data: Pick<OnboardingData, CampoPaso6>): boolean {
    const campos: CampoPaso6[] = ['millonDolares', 'problemaResolver', 'fraseRepresenta', 'admiraEmprendedor', 'mayorAprendizaje']
    const nuevosErrores: Partial<Record<CampoPaso6, string>> = {}
    let hayErrores = false

    for (const campo of campos) {
      const msg = validarTextoLargo(data[campo])
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
