export type EstadoInscrito = 'por_aprobar' | 'aprobado' | 'rechazado'

export interface Inscrito {
  id: string
  orden: number
  fechaInscripcion: string
  nombre: string
  perfil: string
  estado: EstadoInscrito
  observaciones?: string
  foto: string
  ocupacion: string
  email: string
  whatsapp: string
  pasiones: string[]
  superpoderes: string[]
  sueno: string
  tieneIdea: string
  ideaFrase: string
  perfilesBuscados: string[]
  valoresImportantes: string[]
  disponibilidad: string
  millonDolares: string
  problemaResolver: string
  fraseRepresenta: string
  admiraEmprendedor: string
  mayorAprendizaje: string
}
