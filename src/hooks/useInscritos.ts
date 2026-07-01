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
      .select(`
        id, nombre, email, whatsapp, ocupacion, foto, created_at, estado, observaciones, aprobado,
        perfil_suenos(sueno, tiene_idea),
        perfil_ideas(idea),
        perfil_resultado(categoria, descripcion),
        perfil_pasiones(pasion),
        perfil_superpoderes(superpoder),
        perfil_preferencias(perfiles_buscados, valores_importantes, disponibilidad),
        perfil_tinder(millon_dolares, problema_resolver, frase_representa, admira_emprendedor, mayor_aprendizaje)
      `)
      .order('created_at', { ascending: false })

    if (!perfiles || perfiles.length === 0) {
      setCargando(false)
      return
    }

    type Suenos = Array<{ sueno: string; tiene_idea: string }>
    type Ideas = Array<{ idea: string }>
    type Resultado = Array<{ categoria: string; descripcion: string }>
    type Pasiones = Array<{ pasion: string }>
    type Superpoderes = Array<{ superpoder: string }>
    type Preferencias = Array<{ perfiles_buscados: string[]; valores_importantes: string[]; disponibilidad: string }>
    type Tinder = Array<{ millon_dolares: string; problema_resolver: string; frase_representa: string; admira_emprendedor: string; mayor_aprendizaje: string }>

    setInscritos(
      perfiles.map((p, i) => {
        const suenos = (p.perfil_suenos as Suenos)?.[0]
        const resultado = (p.perfil_resultado as Resultado)?.[0]
        const pref = (p.perfil_preferencias as Preferencias)?.[0]
        const tinder = (p.perfil_tinder as Tinder)?.[0]

        return {
          id: p.id,
          orden: perfiles.length - i,
          fechaInscripcion: p.created_at,
          nombre: p.nombre,
          categoria: resultado?.categoria ?? '',
          descripcion: resultado?.descripcion ?? '',
          estado: (p.estado as EstadoInscrito) ?? 'por_aprobar',
          observaciones: p.observaciones ?? undefined,
          foto: p.foto ?? '',
          ocupacion: p.ocupacion ?? '',
          email: p.email ?? '',
          whatsapp: p.whatsapp ?? '',
          sueno: suenos?.sueno ?? '',
          tieneIdea: suenos?.tiene_idea ?? '',
          ideas: (p.perfil_ideas as Ideas)?.map((i) => i.idea) ?? [],
          pasiones: (p.perfil_pasiones as Pasiones)?.map((x) => x.pasion) ?? [],
          superpoderes: (p.perfil_superpoderes as Superpoderes)?.map((s) => s.superpoder) ?? [],
          perfilesBuscados: pref?.perfiles_buscados ?? [],
          valoresImportantes: pref?.valores_importantes ?? [],
          disponibilidad: pref?.disponibilidad ?? '',
          millonDolares: tinder?.millon_dolares ?? '',
          problemaResolver: tinder?.problema_resolver ?? '',
          fraseRepresenta: tinder?.frase_representa ?? '',
          admiraEmprendedor: tinder?.admira_emprendedor ?? '',
          mayorAprendizaje: tinder?.mayor_aprendizaje ?? '',
        }
      })
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
