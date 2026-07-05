export type PesoOpcion = 2.0 | 1.5 | 1.0 | 0.5

export interface OpcionPregunta {
  id: string
  preguntaId: string
  texto: string
  peso: PesoOpcion
}

export interface PreguntaDinamica {
  id: string
  dinamicaId: string
  texto: string
  orden: number
  opciones: OpcionPregunta[]
}

export interface Dinamica {
  id: string
  nombre: string
  tiempoRespuesta: number
  tiempoPausa: number
  createdAt: string
  preguntas: PreguntaDinamica[]
}

export interface OpcionForm {
  texto: string
  peso: PesoOpcion
}

export interface PreguntaForm {
  texto: string
  opciones: OpcionForm[]
}

export interface DinamicaForm {
  nombre: string
  tiempoRespuesta: number
  tiempoPausa: number
  preguntas: PreguntaForm[]
}
