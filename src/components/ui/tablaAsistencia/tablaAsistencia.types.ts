import type { AsistenciaNomada } from '../../../types/asistencia'

export interface TablaAsistenciaProps {
  asistencias: AsistenciaNomada[]
  onVerPerfil: (perfilId: string) => void
}
