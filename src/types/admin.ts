import type { TipoAliado } from '../components/ui/tarjetaAliado/tarjetaAliado.types'
import type { RedSocial } from './onboarding'

export type EstadoInscrito = 'por_aprobar' | 'aprobado' | 'rechazado'

export interface Aliado {
  id: string
  logo: string
  nombre: string
  descripcion: string
  tipo: TipoAliado
  linkedin?: string
  instagram?: string
  web?: string
}

export interface AliadoAdmin extends Aliado {
  activo: boolean
}

export interface Inscrito {
  id: string
  codigoMatch: string
  orden: number
  fechaInscripcion: string
  nombre: string
  categoria: string
  descripcion: string
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
  ideas: string[]
  perfilesBuscados: string[]
  valoresImportantes: string[]
  disponibilidad: string
  millonDolares: string
  problemaResolver: string
  fraseRepresenta: string
  admiraEmprendedor: string
  mayorAprendizaje: string
  redes: RedSocial[]
  tieneEmprendimiento: string
  detalleEmprendimiento: string
}
