import { analizarPerfil } from '../api/perfiles'
import { enviarCorreoRegistro } from '../api/correos'
import type { OnboardingData, ResultadoPerfil } from '../types/onboarding'

export function useOnboarding() {
  async function guardar(data: OnboardingData): Promise<ResultadoPerfil | null> {
    const perfil = await analizarPerfil(data)
    if (!perfil) return null
    enviarCorreoRegistro(data.nombre, data.email)
    return perfil
  }

  return { guardar }
}
