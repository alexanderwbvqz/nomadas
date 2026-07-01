export interface PerfilCompleto {
  id: string
  nombre: string
  ocupacion: string
  foto: string
  email: string
  whatsapp: string
  sueno: string
  tieneIdea: string
  ideas: string[]
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
}

export interface ModalPerfilProps {
  id: string
  onCerrar: () => void
}
