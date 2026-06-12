export type Ocupacion = 'Estudiante' | 'Profesional' | 'Emprendedor' | 'Freelancer' | 'Otro'
export type TieneIdea = 'Sí' | 'No' | 'Tengo varias'
export type DisponibilidadHoras = 'Menos de 5 horas' | '5-10 horas' | '10-20 horas' | 'Más de 20 horas'
export type CategoriaPerfil = 'Tecnología' | 'Marketing' | 'Ventas' | 'Finanzas' | 'Operaciones'
export type PerfilResultado =
  | 'CTO Builder'
  | 'CMO Growth'
  | 'Sales Hunter'
  | 'CFO Strategist'
  | 'COO Executor'
  | 'Co-Founder Generalista'

export interface ScoresPerfil {
  Tecnología: number
  Marketing: number
  Ventas: number
  Finanzas: number
  Operaciones: number
}

export interface ResultadoPerfil {
  perfil: PerfilResultado
  emoji: string
  descripcion: string
  busca: string[]
  scores: ScoresPerfil
}

export interface OnboardingData {
  // Paso 1
  nombre: string
  ocupacion: Ocupacion | ''
  foto: string
  descripcion: string
  // Paso 2
  pasiones: string[]
  // Paso 3
  sueno: string
  tieneIdea: TieneIdea | ''
  ideaFrase: string
  // Paso 4
  superpoderes: string[]
  // Paso 5
  reaccionProblema: string
  rolEnProyecto: string
  // Paso 6
  perfilesBuscados: string[]
  valoresImportantes: string[]
  disponibilidad: DisponibilidadHoras | ''
  // Paso 7
  millonDolares: string
  problemaResolver: string
  fraseRepresenta: string
  admiraEmprendedor: string
  mayorAprendizaje: string
}
