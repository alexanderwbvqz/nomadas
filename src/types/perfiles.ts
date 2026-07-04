export interface RedPerfil {
  red: 'linkedin' | 'facebook' | 'instagram'
  url: string
}

export interface PerfilCompleto {
  id: string
  nombre: string
  ocupacion: string
  ocupacionCategoria: string
  foto: string
  email: string
  whatsapp: string
  sueno: string
  tieneIdea: string
  ideas: string[]
  tieneEmprendimiento: string
  detalleEmprendimiento: string
  categoria: string
  descripcion: string
  pasiones: string[]
  superpoderes: string[]
  perfilesBuscados: string[]
  valoresImportantes: string[]
  disponibilidad: string
  millonDolares: string
  problemaResolver: string
  fraseRepresenta: string
  admiraEmprendedor: string
  mayorAprendizaje: string
  redes: RedPerfil[]
}

export interface Cofundador {
  id: string
  nombre: string
  ocupacion: string
  foto: string
  categoria: string
  descripcion: string
  superpoderes: string[]
  whatsapp: string
}

export interface MatchPerfil {
  id: string
  nombre: string
  foto: string
  ocupacion: string
  categoria: string
  descripcion: string
  sueno: string
  tieneIdea: boolean
  pasiones: string[]
  superpoderes: string[]
  fraseRompeHielo: string
  preguntaHielo: string
  whatsapp: string
  afinidad: number
}
