import type { OnboardingData } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import './Paso2Pasiones.css'

const PASIONES = [
  'Tecnología', 'IA', 'Marketing', 'Ventas', 'Finanzas', 'Startups',
  'Educación', 'Salud', 'Turismo', 'Gastronomía', 'Moda', 'Deportes',
  'Videojuegos', 'Contenido digital',
]

const MAX = 5

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

export default function Paso2Pasiones({ data, onChange }: Props) {
  function toggle(p: string) {
    if (data.pasiones.includes(p)) {
      onChange('pasiones', data.pasiones.filter((x) => x !== p))
    } else if (data.pasiones.length < MAX) {
      onChange('pasiones', [...data.pasiones, p])
    }
  }

  return (
    <div>
      <h1 className="paso__titulo">🔥 ¿Qué te apasiona?</h1>
      <p className="paso__subtitulo">Selecciona hasta {MAX} temas.</p>

      <div className="paso__badges">
        {PASIONES.map((p) => (
          <BadgeSeleccionable
            key={p}
            label={p}
            seleccionado={data.pasiones.includes(p)}
            onClick={() => toggle(p)}
            deshabilitado={data.pasiones.length >= MAX && !data.pasiones.includes(p)}
          />
        ))}
      </div>
      <p className="paso__limite">{data.pasiones.length}/{MAX} seleccionadas</p>
    </div>
  )
}
