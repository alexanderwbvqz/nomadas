export type TipoResultado = 'registrado' | 'ya_registrado' | 'por_aprobar' | 'rechazado' | 'no_encontrado'

export interface ResultadoRegistro {
  tipo: TipoResultado
  nombre: string
}

export interface Evento {
  id: string
  nombre: string
  fecha: string
  estado: 'activo' | 'finalizado'
  createdAt: string
}

export interface AsistenciaNomada {
  perfilId: string
  nombre: string
  whatsapp: string
  foto: string
  categoria: string
  registradoEn: string
}
