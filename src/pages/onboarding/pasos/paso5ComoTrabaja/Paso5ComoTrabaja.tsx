import type { OnboardingData } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import './Paso5ComoTrabaja.css'

const REACCIONES = [
  'Lo analizo', 'Hablo con clientes', 'Busco una solución técnica',
  'Organizo al equipo', 'Pienso ideas nuevas',
]

const ROLES = [
  'Construye el producto', 'Consigue clientes', 'Organiza el trabajo',
  'Analiza números', 'Diseña estrategias',
]

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

export default function Paso5ComoTrabaja({ data, onChange }: Props) {
  return (
    <div>
      <h1 className="paso__titulo">🧠 ¿Cómo trabajas?</h1>
      <p className="paso__subtitulo">Cuéntanos cómo eres en acción.</p>

      <div className="paso5__seccion">
        <p className="paso__pregunta">Cuando aparece un problema, normalmente tú...</p>
        <div className="paso__badges">
          {REACCIONES.map((r) => (
            <BadgeSeleccionable
              key={r}
              label={r}
              seleccionado={data.reaccionProblema === r}
              onClick={() => onChange('reaccionProblema', r)}
            />
          ))}
        </div>
      </div>

      <div className="paso5__seccion">
        <p className="paso__pregunta">En un proyecto normalmente eres quien...</p>
        <div className="paso__badges">
          {ROLES.map((r) => (
            <BadgeSeleccionable
              key={r}
              label={r}
              seleccionado={data.rolEnProyecto === r}
              onClick={() => onChange('rolEnProyecto', r)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
