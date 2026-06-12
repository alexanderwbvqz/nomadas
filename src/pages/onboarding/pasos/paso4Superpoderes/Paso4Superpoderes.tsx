import type { OnboardingData } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import './Paso4Superpoderes.css'

const GRUPOS: { titulo: string; items: string[] }[] = [
  { titulo: 'Tecnología', items: ['Programación', 'IA', 'Desarrollo Web', 'Desarrollo Móvil', 'UX/UI', 'Automatización', 'Bases de Datos'] },
  { titulo: 'Marketing', items: ['Marketing Digital', 'Redes Sociales', 'Branding', 'Diseño', 'Copywriting', 'SEO'] },
  { titulo: 'Ventas', items: ['Negociación', 'Prospección', 'Cierre de ventas', 'Atención al cliente', 'Presentaciones'] },
  { titulo: 'Finanzas', items: ['Contabilidad', 'Finanzas', 'Costos', 'Excel', 'Modelos financieros'] },
  { titulo: 'Operaciones', items: ['Gestión de proyectos', 'Logística', 'Procesos', 'RRHH', 'Organización'] },
]

const MAX = 10

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

export default function Paso4Superpoderes({ data, onChange }: Props) {
  function toggle(item: string) {
    if (data.superpoderes.includes(item)) {
      onChange('superpoderes', data.superpoderes.filter((x) => x !== item))
    } else if (data.superpoderes.length < MAX) {
      onChange('superpoderes', [...data.superpoderes, item])
    }
  }

  return (
    <div>
      <h1 className="paso__titulo">⚡ Tus superpoderes</h1>
      <p className="paso__subtitulo">¿Qué sabes hacer bien? Selecciona máximo {MAX}.</p>

      {GRUPOS.map((g) => (
        <div key={g.titulo} className="paso4__grupo">
          <p className="paso4__grupo-titulo">{g.titulo}</p>
          <div className="paso__badges">
            {g.items.map((item) => (
              <BadgeSeleccionable
                key={item}
                label={item}
                seleccionado={data.superpoderes.includes(item)}
                onClick={() => toggle(item)}
                deshabilitado={data.superpoderes.length >= MAX && !data.superpoderes.includes(item)}
              />
            ))}
          </div>
        </div>
      ))}
      <p className="paso__limite">{data.superpoderes.length}/{MAX} seleccionados</p>
    </div>
  )
}
