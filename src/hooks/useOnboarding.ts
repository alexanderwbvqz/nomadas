import { analizarPerfil } from '../api/perfiles'
import type { OnboardingData, ResultadoPerfil } from '../types/onboarding'

export function useOnboarding() {
  async function guardar(data: OnboardingData): Promise<ResultadoPerfil | null> {
    return await analizarPerfil(data)
  }

  return { guardar }
}
