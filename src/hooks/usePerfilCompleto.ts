import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { PerfilCompleto } from '../components/ui/modalPerfil/modalPerfil.types'

export function usePerfilCompleto(id: string) {
  const [perfil, setPerfil] = useState<PerfilCompleto | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      const [
        { data: base },
        { data: pasiones },
        { data: superpoderes },
        { data: preferencias },
        { data: tinder },
      ] = await Promise.all([
        supabase.from('perfiles_datos').select('*').eq('id', id).single(),
        supabase.from('perfil_pasiones').select('pasion').eq('perfil_id', id),
        supabase.from('perfil_superpoderes').select('superpoder').eq('perfil_id', id),
        supabase.from('perfil_preferencias').select('*').eq('perfil_id', id).single(),
        supabase.from('perfil_tinder').select('*').eq('perfil_id', id).single(),
      ])

      if (!base) return

      setPerfil({
        id: base.id,
        nombre: base.nombre,
        ocupacion: base.ocupacion ?? '',
        foto: base.foto ?? '',
        email: base.email ?? '',
        whatsapp: base.whatsapp ?? '',
        sueno: base.sueno ?? '',
        tieneIdea: base.tiene_idea ?? '',
        ideaFrase: base.idea_frase ?? '',
        perfilResultado: base.perfil_resultado ?? '',
        pasiones: pasiones?.map((p) => p.pasion) ?? [],
        superpoderes: superpoderes?.map((s) => s.superpoder) ?? [],
        perfilesBuscados: preferencias?.perfiles_buscados ?? [],
        valoresImportantes: preferencias?.valores_importantes ?? [],
        disponibilidad: preferencias?.disponibilidad ?? '',
        millonDolares: tinder?.millon_dolares ?? '',
        problemaResolver: tinder?.problema_resolver ?? '',
        fraseRepresenta: tinder?.frase_representa ?? '',
        admiraEmprendedor: tinder?.admira_emprendedor ?? '',
        mayorAprendizaje: tinder?.mayor_aprendizaje ?? '',
      })
      setCargando(false)
    }

    cargar()
  }, [id])

  return { perfil, cargando }
}
