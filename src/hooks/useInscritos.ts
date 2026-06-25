import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Inscrito, EstadoInscrito } from '../types/admin'

export function useInscritos() {
  const [inscritos, setInscritos] = useState<Inscrito[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargar()
  }, [])

  async function cargar() {
    setCargando(true)

    const { data: perfiles } = await supabase
      .from('perfiles_datos')
      .select('*')
      .order('created_at', { ascending: false })

    if (!perfiles || perfiles.length === 0) {
      setCargando(false)
      return
    }

    const ids = perfiles.map((p) => p.id)

    const [
      { data: pasiones },
      { data: superpoderes },
      { data: preferencias },
      { data: tinder },
    ] = await Promise.all([
      supabase.from('perfil_pasiones').select('*').in('perfil_id', ids),
      supabase.from('perfil_superpoderes').select('*').in('perfil_id', ids),
      supabase.from('perfil_preferencias').select('*').in('perfil_id', ids),
      supabase.from('perfil_tinder').select('*').in('perfil_id', ids),
    ])

    const pasionesPorId: Record<string, string[]> = {}
    pasiones?.forEach(({ perfil_id, pasion }) => {
      if (!pasionesPorId[perfil_id]) pasionesPorId[perfil_id] = []
      pasionesPorId[perfil_id].push(pasion)
    })

    const superpoderesPorId: Record<string, string[]> = {}
    superpoderes?.forEach(({ perfil_id, superpoder }) => {
      if (!superpoderesPorId[perfil_id]) superpoderesPorId[perfil_id] = []
      superpoderesPorId[perfil_id].push(superpoder)
    })

    const prefPorId: Record<string, typeof preferencias[0]> = {}
    preferencias?.forEach((p) => { prefPorId[p.perfil_id] = p })

    const tinderPorId: Record<string, typeof tinder[0]> = {}
    tinder?.forEach((t) => { tinderPorId[t.perfil_id] = t })

    setInscritos(
      perfiles.map((p, i) => ({
        id: p.id,
        orden: perfiles.length - i,
        fechaInscripcion: p.created_at,
        nombre: p.nombre,
        perfil: p.perfil_resultado ?? '',
        estado: (p.estado as EstadoInscrito) ?? 'por_aprobar',
        observaciones: p.observaciones ?? undefined,
        foto: p.foto ?? '',
        ocupacion: p.ocupacion ?? '',
        email: p.email ?? '',
        whatsapp: p.whatsapp ?? '',
        sueno: p.sueno ?? '',
        tieneIdea: p.tiene_idea ?? '',
        ideaFrase: p.idea_frase ?? '',
        pasiones: pasionesPorId[p.id] ?? [],
        superpoderes: superpoderesPorId[p.id] ?? [],
        perfilesBuscados: prefPorId[p.id]?.perfiles_buscados ?? [],
        valoresImportantes: prefPorId[p.id]?.valores_importantes ?? [],
        disponibilidad: prefPorId[p.id]?.disponibilidad ?? '',
        millonDolares: tinderPorId[p.id]?.millon_dolares ?? '',
        problemaResolver: tinderPorId[p.id]?.problema_resolver ?? '',
        fraseRepresenta: tinderPorId[p.id]?.frase_representa ?? '',
        admiraEmprendedor: tinderPorId[p.id]?.admira_emprendedor ?? '',
        mayorAprendizaje: tinderPorId[p.id]?.mayor_aprendizaje ?? '',
      }))
    )

    setCargando(false)
  }

  async function aprobar(id: string) {
    await supabase
      .from('perfiles_datos')
      .update({ estado: 'aprobado', aprobado: true, observaciones: null })
      .eq('id', id)

    setInscritos((prev) =>
      prev.map((i) => i.id === id ? { ...i, estado: 'aprobado', observaciones: undefined } : i)
    )
  }

  async function rechazar(id: string, motivo: string) {
    await supabase
      .from('perfiles_datos')
      .update({ estado: 'rechazado', aprobado: false, observaciones: motivo })
      .eq('id', id)

    setInscritos((prev) =>
      prev.map((i) => i.id === id ? { ...i, estado: 'rechazado', observaciones: motivo } : i)
    )
  }

  return { inscritos, cargando, aprobar, rechazar }
}
