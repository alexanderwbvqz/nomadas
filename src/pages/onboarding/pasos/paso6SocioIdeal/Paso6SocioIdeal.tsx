import type { OnboardingData, DisponibilidadHoras } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import './Paso6SocioIdeal.css'

const PERFILES = ['Tecnología', 'Marketing', 'Ventas', 'Finanzas', 'Operaciones']
const VALORES = [
  'Honestidad', 'Compromiso', 'Ambición', 'Creatividad',
  'Responsabilidad', 'Comunicación', 'Liderazgo', 'Trabajo en equipo',
]
const DISPONIBILIDADES: DisponibilidadHoras[] = [
  'Menos de 5 horas', '5-10 horas', '10-20 horas', 'Más de 20 horas',
]
const MAX_VALORES = 3

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

export default function Paso6SocioIdeal({ data, onChange }: Props) {
  function togglePerfil(p: string) {
    if (data.perfilesBuscados.includes(p)) {
      onChange('perfilesBuscados', data.perfilesBuscados.filter((x) => x !== p))
    } else {
      onChange('perfilesBuscados', [...data.perfilesBuscados, p])
    }
  }

  function toggleValor(v: string) {
    if (data.valoresImportantes.includes(v)) {
      onChange('valoresImportantes', data.valoresImportantes.filter((x) => x !== v))
    } else if (data.valoresImportantes.length < MAX_VALORES) {
      onChange('valoresImportantes', [...data.valoresImportantes, v])
    }
  }

  return (
    <div>
      <h1 className="paso__titulo">Tu socio ideal</h1>
      <p className="paso__subtitulo">¿Con quién quieres construir?</p>

      <div className="paso6__seccion">
        <p className="paso__pregunta">¿Qué perfil buscas?</p>
        <div className="paso__badges">
          {PERFILES.map((p) => (
            <BadgeSeleccionable
              key={p}
              label={p}
              seleccionado={data.perfilesBuscados.includes(p)}
              onClick={() => togglePerfil(p)}
            />
          ))}
        </div>
      </div>

      <div className="paso6__seccion">
        <p className="paso__pregunta">¿Qué valoras más en una persona? (Elige {MAX_VALORES})</p>
        <div className="paso__badges">
          {VALORES.map((v) => (
            <BadgeSeleccionable
              key={v}
              label={v}
              seleccionado={data.valoresImportantes.includes(v)}
              onClick={() => toggleValor(v)}
              deshabilitado={data.valoresImportantes.length >= MAX_VALORES && !data.valoresImportantes.includes(v)}
            />
          ))}
        </div>
        <p className="paso__limite">{data.valoresImportantes.length}/{MAX_VALORES} seleccionados</p>
      </div>

      <div className="paso6__seccion">
        <p className="paso__pregunta">¿Cuánto tiempo podrías dedicar a un emprendimiento?</p>
        <div className="paso__badges">
          {DISPONIBILIDADES.map((d) => (
            <BadgeSeleccionable
              key={d}
              label={d}
              seleccionado={data.disponibilidad === d}
              onClick={() => onChange('disponibilidad', d)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
