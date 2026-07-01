export type Ocupacion = 'Estudiante' | 'Profesional' | 'Emprendedor' | 'Freelancer' | 'Otro' | (string & {})
export type TieneIdea = 'Sí' | 'No' | 'Tengo varias'
export type DisponibilidadHoras = 'Menos de 5 horas' | '5-10 horas' | '10-20 horas' | 'Más de 20 horas'
export type CategoriaPerfil = 'Tecnología' | 'Marketing - Ventas' | 'Operaciones' | 'Finanzas'

export interface ResultadoPerfil {
  categoria: CategoriaPerfil
  descripcion: string
  busca: string[]
}

export interface OnboardingData {
  // Paso 1
  nombre: string
  ocupacion: Ocupacion | ''
  foto: string
  whatsapp: string
  email: string
  // Paso 2
  pasiones: string[]
  // Paso 3
  sueno: string
  tieneIdea: TieneIdea | ''
  ideaFrase: string
  ideasFrases: string[]
  // Paso 4
  superpoderes: string[]
  // Paso 5
  perfilesBuscados: string[]
  valoresImportantes: string[]
  disponibilidad: DisponibilidadHoras | ''
  // Paso 6
  millonDolares: string
  problemaResolver: string
  fraseRepresenta: string
  admiraEmprendedor: string
  mayorAprendizaje: string
}
