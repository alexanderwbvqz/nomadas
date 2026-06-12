import type {
  OnboardingData,
  ScoresPerfil,
  ResultadoPerfil,
  PerfilResultado,
} from '../../types/onboarding'

const SUPERPODERES_MAP: Record<string, keyof ScoresPerfil> = {
  Programación: 'Tecnología', IA: 'Tecnología', 'Desarrollo Web': 'Tecnología',
  'Desarrollo Móvil': 'Tecnología', 'UX/UI': 'Tecnología', Automatización: 'Tecnología',
  'Bases de Datos': 'Tecnología',
  'Marketing Digital': 'Marketing', 'Redes Sociales': 'Marketing', Branding: 'Marketing',
  Diseño: 'Marketing', Copywriting: 'Marketing', SEO: 'Marketing',
  Negociación: 'Ventas', Prospección: 'Ventas', 'Cierre de ventas': 'Ventas',
  'Atención al cliente': 'Ventas', Presentaciones: 'Ventas',
  Contabilidad: 'Finanzas', Finanzas: 'Finanzas', Costos: 'Finanzas',
  Excel: 'Finanzas', 'Modelos financieros': 'Finanzas',
  'Gestión de proyectos': 'Operaciones', Logística: 'Operaciones', Procesos: 'Operaciones',
  RRHH: 'Operaciones', Organización: 'Operaciones',
}

const PASIONES_MAP: Record<string, keyof ScoresPerfil> = {
  Tecnología: 'Tecnología', IA: 'Tecnología', Videojuegos: 'Tecnología',
  Marketing: 'Marketing', 'Contenido digital': 'Marketing', Moda: 'Marketing',
  Ventas: 'Ventas', Turismo: 'Ventas', Gastronomía: 'Ventas',
  Finanzas: 'Finanzas', Startups: 'Finanzas',
  Educación: 'Operaciones', Salud: 'Operaciones', Deportes: 'Operaciones',
}

const SUENO_MAP: Record<string, keyof ScoresPerfil> = {
  'Una startup tecnológica': 'Tecnología',
  'Una agencia': 'Marketing',
  'Un ecommerce': 'Ventas',
  'Una empresa tradicional': 'Finanzas',
  'Una empresa de impacto social': 'Operaciones',
}

const REACCION_MAP: Record<string, keyof ScoresPerfil> = {
  'Busco una solución técnica': 'Tecnología',
  'Hablo con clientes': 'Ventas',
  'Lo analizo': 'Finanzas',
  'Organizo al equipo': 'Operaciones',
  'Pienso ideas nuevas': 'Marketing',
}

const ROL_MAP: Record<string, keyof ScoresPerfil> = {
  'Construye el producto': 'Tecnología',
  'Consigue clientes': 'Ventas',
  'Organiza el trabajo': 'Operaciones',
  'Analiza números': 'Finanzas',
  'Diseña estrategias': 'Marketing',
}

const PERFILES: Record<keyof ScoresPerfil, { perfil: PerfilResultado; emoji: string; descripcion: string }> = {
  Tecnología: { perfil: 'CTO Builder', emoji: '💻', descripcion: 'Le encanta construir productos. Piensa en soluciones tecnológicas.' },
  Marketing: { perfil: 'CMO Growth', emoji: '📢', descripcion: 'Le apasiona conectar con clientes. Destaca en marketing y ventas.' },
  Ventas: { perfil: 'Sales Hunter', emoji: '🎯', descripcion: 'Nació para cerrar tratos. Encuentra clientes donde otros no los ven.' },
  Finanzas: { perfil: 'CFO Strategist', emoji: '💰', descripcion: 'Analiza oportunidades. Piensa en rentabilidad y modelos de negocio.' },
  Operaciones: { perfil: 'COO Executor', emoji: '⚙️', descripcion: 'Convierte el caos en sistemas. Hace que las cosas sucedan.' },
}

function sumar(scores: ScoresPerfil, categoria: keyof ScoresPerfil, puntos: number) {
  scores[categoria] += puntos
}

export function calcularPerfil(data: OnboardingData): ResultadoPerfil {
  const scores: ScoresPerfil = { Tecnología: 0, Marketing: 0, Ventas: 0, Finanzas: 0, Operaciones: 0 }

  // Paso 4 — Superpoderes (×3)
  data.superpoderes.forEach((s) => {
    const cat = SUPERPODERES_MAP[s]
    if (cat) sumar(scores, cat, 3)
  })

  // Paso 5 — Reacción (×2)
  const catReaccion = REACCION_MAP[data.reaccionProblema]
  if (catReaccion) sumar(scores, catReaccion, 2)

  // Paso 5 — Rol (×2)
  const catRol = ROL_MAP[data.rolEnProyecto]
  if (catRol) sumar(scores, catRol, 2)

  // Paso 3 — Sueño (×1.5)
  const catSueno = SUENO_MAP[data.sueno]
  if (catSueno) sumar(scores, catSueno, 1.5)

  // Paso 2 — Pasiones (×1)
  data.pasiones.forEach((p) => {
    const cat = PASIONES_MAP[p]
    if (cat) sumar(scores, cat, 1)
  })

  // Determinar ganador
  const categorias = Object.keys(scores) as (keyof ScoresPerfil)[]
  const sorted = [...categorias].sort((a, b) => scores[b] - scores[a])
  const ganador = sorted[0]
  const segundo = sorted[1]

  const esGeneralista = scores[ganador] < scores[segundo] * 1.25

  if (esGeneralista) {
    return {
      perfil: 'Co-Founder Generalista',
      emoji: '🦄',
      descripcion: 'Tienes habilidades distribuidas. Eres el pegamento del equipo.',
      busca: data.perfilesBuscados,
      scores,
    }
  }

  const { perfil, emoji, descripcion } = PERFILES[ganador]
  return { perfil, emoji, descripcion, busca: data.perfilesBuscados, scores }
}
