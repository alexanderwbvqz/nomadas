import { supabase } from '../lib/supabase'
import type { Dinamica, DinamicaForm, PesoOpcion } from '../types/dinamicas'

export async function getDinamicas(): Promise<Dinamica[]> {
  const { data } = await supabase
    .from('dinamicas')
    .select(`
      id, nombre, tiempo_respuesta, tiempo_pausa, created_at,
      preguntas_dinamica (
        id, texto, orden,
        opciones_pregunta (id, texto, peso)
      )
    `)
    .order('created_at', { ascending: false })

  if (!data) return []

  return data.map((d) => ({
    id: d.id,
    nombre: d.nombre,
    tiempoRespuesta: d.tiempo_respuesta,
    tiempoPausa: d.tiempo_pausa,
    createdAt: d.created_at,
    preguntas: (d.preguntas_dinamica as any[])
      .sort((a, b) => a.orden - b.orden)
      .map((p) => ({
        id: p.id,
        dinamicaId: d.id,
        texto: p.texto,
        orden: p.orden,
        opciones: (p.opciones_pregunta as any[]).map((o) => ({
          id: o.id,
          preguntaId: p.id,
          texto: o.texto,
          peso: o.peso as PesoOpcion,
        })),
      })),
  }))
}

export async function getDinamica(id: string): Promise<Dinamica | null> {
  const { data: d } = await supabase
    .from('dinamicas')
    .select(`
      id, nombre, tiempo_respuesta, tiempo_pausa, created_at,
      preguntas_dinamica (
        id, texto, orden,
        opciones_pregunta (id, texto, peso)
      )
    `)
    .eq('id', id)
    .single()

  if (!d) return null

  return {
    id: d.id,
    nombre: d.nombre,
    tiempoRespuesta: d.tiempo_respuesta,
    tiempoPausa: d.tiempo_pausa,
    createdAt: d.created_at,
    preguntas: (d.preguntas_dinamica as any[])
      .sort((a, b) => a.orden - b.orden)
      .map((p) => ({
        id: p.id,
        dinamicaId: d.id,
        texto: p.texto,
        orden: p.orden,
        opciones: (p.opciones_pregunta as any[]).map((o) => ({
          id: o.id,
          preguntaId: p.id,
          texto: o.texto,
          peso: o.peso as PesoOpcion,
        })),
      })),
  }
}

export async function crearDinamica(form: DinamicaForm): Promise<void> {
  const { data: dinamica } = await supabase
    .from('dinamicas')
    .insert({
      nombre: form.nombre,
      tiempo_respuesta: form.tiempoRespuesta,
      tiempo_pausa: form.tiempoPausa,
    })
    .select('id')
    .single()

  if (!dinamica) return

  for (let i = 0; i < form.preguntas.length; i++) {
    const pf = form.preguntas[i]
    const { data: pregunta } = await supabase
      .from('preguntas_dinamica')
      .insert({ dinamica_id: dinamica.id, texto: pf.texto, orden: i })
      .select('id')
      .single()

    if (!pregunta) continue

    await supabase.from('opciones_pregunta').insert(
      pf.opciones.map((o) => ({
        pregunta_id: pregunta.id,
        texto: o.texto,
        peso: o.peso,
      }))
    )
  }
}

export async function actualizarDinamica(id: string, form: DinamicaForm): Promise<void> {
  await supabase.from('dinamicas').update({
    nombre: form.nombre,
    tiempo_respuesta: form.tiempoRespuesta,
    tiempo_pausa: form.tiempoPausa,
  }).eq('id', id)

  await supabase.from('preguntas_dinamica').delete().eq('dinamica_id', id)

  for (let i = 0; i < form.preguntas.length; i++) {
    const pf = form.preguntas[i]
    const { data: pregunta } = await supabase
      .from('preguntas_dinamica')
      .insert({ dinamica_id: id, texto: pf.texto, orden: i })
      .select('id')
      .single()

    if (!pregunta) continue

    await supabase.from('opciones_pregunta').insert(
      pf.opciones.map((o) => ({
        pregunta_id: pregunta.id,
        texto: o.texto,
        peso: o.peso,
      }))
    )
  }
}

export async function eliminarDinamica(id: string): Promise<void> {
  await supabase.from('dinamicas').delete().eq('id', id)
}
