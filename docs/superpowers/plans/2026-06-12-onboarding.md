# Onboarding Nómadas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-step onboarding flow that collects user profile data, calculates an entrepreneur archetype, shows an animated result card, and redirects to the dashboard.

**Architecture:** `src/pages/onboarding/page.tsx` is the single orchestrator — it holds all state in one `OnboardingData` object and renders the active step as a stateless component. Steps receive `data` + `onChange` and emit field updates upward. After step 7, a scoring function calculates the profile and `TarjetaResultado` is shown before redirecting to `/dashboard`.

**Tech Stack:** React 19, TypeScript, React Router DOM v7, CSS (BEM), Vite, pnpm. No test framework present — verify via `pnpm dev`.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/types/onboarding.ts` | Create | Shared types for all steps |
| `src/components/ui/badgeSeleccionable/badgeSeleccionable.types.ts` | Create | Badge props |
| `src/components/ui/badgeSeleccionable/badgeSeleccionable.tsx` | Create | Reusable selectable badge |
| `src/components/ui/badgeSeleccionable/badgeSeleccionable.css` | Create | Badge styles |
| `src/components/ui/tarjetaResultado/tarjetaResultado.types.ts` | Create | Result card props |
| `src/components/ui/tarjetaResultado/tarjetaResultado.tsx` | Create | Animated result card |
| `src/components/ui/tarjetaResultado/tarjetaResultado.css` | Create | Result card + animations |
| `src/pages/onboarding/page.tsx` | Create | Orchestrator: state + progress + nav |
| `src/pages/onboarding/page.css` | Create | Onboarding shell styles |
| `src/pages/onboarding/pasos/paso1Perfil/Paso1Perfil.tsx` | Create | Step 1 |
| `src/pages/onboarding/pasos/paso1Perfil/Paso1Perfil.css` | Create | Step 1 styles |
| `src/pages/onboarding/pasos/paso2Pasiones/Paso2Pasiones.tsx` | Create | Step 2 |
| `src/pages/onboarding/pasos/paso2Pasiones/Paso2Pasiones.css` | Create | Step 2 styles |
| `src/pages/onboarding/pasos/paso3Sueno/Paso3Sueno.tsx` | Create | Step 3 |
| `src/pages/onboarding/pasos/paso3Sueno/Paso3Sueno.css` | Create | Step 3 styles |
| `src/pages/onboarding/pasos/paso4Superpoderes/Paso4Superpoderes.tsx` | Create | Step 4 |
| `src/pages/onboarding/pasos/paso4Superpoderes/Paso4Superpoderes.css` | Create | Step 4 styles |
| `src/pages/onboarding/pasos/paso5ComoTrabaja/Paso5ComoTrabaja.tsx` | Create | Step 5 |
| `src/pages/onboarding/pasos/paso5ComoTrabaja/Paso5ComoTrabaja.css` | Create | Step 5 styles |
| `src/pages/onboarding/pasos/paso6SocioIdeal/Paso6SocioIdeal.tsx` | Create | Step 6 |
| `src/pages/onboarding/pasos/paso6SocioIdeal/Paso6SocioIdeal.css` | Create | Step 6 styles |
| `src/pages/onboarding/pasos/paso7Tinder/Paso7Tinder.tsx` | Create | Step 7 |
| `src/pages/onboarding/pasos/paso7Tinder/Paso7Tinder.css` | Create | Step 7 styles |
| `src/pages/onboarding/scoring.ts` | Create | Score calculation + profile result |
| `src/pages/dashboard/page.tsx` | Create | Dashboard placeholder |
| `src/pages/dashboard/page.css` | Create | Dashboard placeholder styles |
| `src/routes/index.tsx` | Modify | Add `/onboarding` and `/dashboard` routes |
| `src/pages/registrate/page.tsx` | Modify | Redirect to `/onboarding` on submit |

---

### Task 1: Types

**Files:**
- Create: `src/types/onboarding.ts`

- [ ] **Step 1: Create the types file**

```typescript
// src/types/onboarding.ts
export type Ocupacion = 'Estudiante' | 'Profesional' | 'Emprendedor' | 'Freelancer' | 'Otro'
export type TieneIdea = 'Sí' | 'No' | 'Tengo varias'
export type DisponibilidadHoras = 'Menos de 5 horas' | '5-10 horas' | '10-20 horas' | 'Más de 20 horas'
export type CategoriaPerfil = 'Tecnología' | 'Marketing' | 'Ventas' | 'Finanzas' | 'Operaciones'
export type PerfilResultado =
  | 'CTO Builder'
  | 'CMO Growth'
  | 'Sales Hunter'
  | 'CFO Strategist'
  | 'COO Executor'
  | 'Co-Founder Generalista'

export interface ScoresPerfil {
  Tecnología: number
  Marketing: number
  Ventas: number
  Finanzas: number
  Operaciones: number
}

export interface ResultadoPerfil {
  perfil: PerfilResultado
  emoji: string
  descripcion: string
  busca: string[]
  scores: ScoresPerfil
}

export interface OnboardingData {
  // Paso 1
  nombre: string
  ocupacion: Ocupacion | ''
  foto: string
  descripcion: string
  // Paso 2
  pasiones: string[]
  // Paso 3
  sueno: string
  tieneIdea: TieneIdea | ''
  ideaFrase: string
  // Paso 4
  superpoderes: string[]
  // Paso 5
  reaccionProblema: string
  rolEnProyecto: string
  // Paso 6
  perfilesBuscados: string[]
  valoresImportantes: string[]
  disponibilidad: DisponibilidadHoras | ''
  // Paso 7
  millonDolares: string
  problemaResolver: string
  fraseRepresenta: string
  admiraEmprendedor: string
  mayorAprendizaje: string
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/onboarding.ts
git commit -m "feat: add onboarding types"
```

---

### Task 2: BadgeSeleccionable component

**Files:**
- Create: `src/components/ui/badgeSeleccionable/badgeSeleccionable.types.ts`
- Create: `src/components/ui/badgeSeleccionable/badgeSeleccionable.tsx`
- Create: `src/components/ui/badgeSeleccionable/badgeSeleccionable.css`

- [ ] **Step 1: Create types**

```typescript
// src/components/ui/badgeSeleccionable/badgeSeleccionable.types.ts
export interface BadgeSeleccionableProps {
  label: string
  seleccionado: boolean
  onClick: () => void
  deshabilitado?: boolean
}
```

- [ ] **Step 2: Create component**

```tsx
// src/components/ui/badgeSeleccionable/badgeSeleccionable.tsx
import type { BadgeSeleccionableProps } from './badgeSeleccionable.types'
import './badgeSeleccionable.css'

export default function BadgeSeleccionable({
  label,
  seleccionado,
  onClick,
  deshabilitado = false,
}: BadgeSeleccionableProps) {
  return (
    <button
      type="button"
      className={`badge-sel${seleccionado ? ' badge-sel--activo' : ''}${deshabilitado ? ' badge-sel--deshabilitado' : ''}`}
      onClick={onClick}
      disabled={deshabilitado && !seleccionado}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 3: Create styles**

```css
/* src/components/ui/badgeSeleccionable/badgeSeleccionable.css */
.badge-sel {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1.5px solid transparent;
  background: #F3F4F6;
  color: #374151;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border-color 0.18s, opacity 0.18s, transform 0.12s;
  white-space: nowrap;
  user-select: none;
}

.badge-sel:hover:not(:disabled) {
  background: #E5E7EB;
  transform: translateY(-1px);
}

.badge-sel--activo {
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  color: #ffffff;
  border-color: transparent;
}

.badge-sel--activo:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
}

.badge-sel--deshabilitado {
  opacity: 0.4;
  cursor: not-allowed;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/badgeSeleccionable/
git commit -m "feat: add BadgeSeleccionable component"
```

---

### Task 3: Scoring utility

**Files:**
- Create: `src/pages/onboarding/scoring.ts`

- [ ] **Step 1: Create scoring file**

```typescript
// src/pages/onboarding/scoring.ts
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/onboarding/scoring.ts
git commit -m "feat: add onboarding scoring logic"
```

---

### Task 4: TarjetaResultado component

**Files:**
- Create: `src/components/ui/tarjetaResultado/tarjetaResultado.types.ts`
- Create: `src/components/ui/tarjetaResultado/tarjetaResultado.tsx`
- Create: `src/components/ui/tarjetaResultado/tarjetaResultado.css`

- [ ] **Step 1: Create types**

```typescript
// src/components/ui/tarjetaResultado/tarjetaResultado.types.ts
import type { ResultadoPerfil } from '../../../types/onboarding'

export interface TarjetaResultadoProps {
  resultado: ResultadoPerfil
  nombre: string
  foto: string
  superpoderes: string[]
  fraseRepresenta: string
  onEntrar: () => void
}
```

- [ ] **Step 2: Create component**

```tsx
// src/components/ui/tarjetaResultado/tarjetaResultado.tsx
import { useEffect, useState } from 'react'
import type { TarjetaResultadoProps } from './tarjetaResultado.types'
import './tarjetaResultado.css'

export default function TarjetaResultado({
  resultado,
  nombre,
  foto,
  superpoderes,
  fraseRepresenta,
  onEntrar,
}: TarjetaResultadoProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const topSuperpoderes = superpoderes.slice(0, 3)

  return (
    <div className={`tarjeta-resultado__overlay${visible ? ' tarjeta-resultado__overlay--visible' : ''}`}>
      <div className={`tarjeta-resultado${visible ? ' tarjeta-resultado--visible' : ''}`}>
        <div className="tarjeta-resultado__glow" />

        <div className="tarjeta-resultado__foto-wrapper tarjeta-resultado__item">
          {foto ? (
            <img src={foto} alt={nombre} className="tarjeta-resultado__foto" />
          ) : (
            <div className="tarjeta-resultado__foto-placeholder">
              {nombre.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="tarjeta-resultado__emoji tarjeta-resultado__item">
          {resultado.emoji}
        </div>

        <h2 className="tarjeta-resultado__perfil tarjeta-resultado__item">
          {resultado.perfil}
        </h2>

        <p className="tarjeta-resultado__nombre tarjeta-resultado__item">{nombre}</p>

        {topSuperpoderes.length > 0 && (
          <div className="tarjeta-resultado__tags tarjeta-resultado__item">
            {topSuperpoderes.map((s) => (
              <span key={s} className="tarjeta-resultado__tag">{s}</span>
            ))}
          </div>
        )}

        <p className="tarjeta-resultado__frase tarjeta-resultado__item">
          "{fraseRepresenta}"
        </p>

        <p className="tarjeta-resultado__descripcion tarjeta-resultado__item">
          {resultado.descripcion}
        </p>

        {resultado.busca.length > 0 && (
          <p className="tarjeta-resultado__busca tarjeta-resultado__item">
            Busca: <strong>{resultado.busca.join(' + ')}</strong>
          </p>
        )}

        <button className="tarjeta-resultado__btn tarjeta-resultado__item" onClick={onEntrar}>
          Entrar a Nómadas
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create styles**

```css
/* src/components/ui/tarjetaResultado/tarjetaResultado.css */
.tarjeta-resultado__overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 8, 26, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.tarjeta-resultado__overlay--visible {
  opacity: 1;
}

.tarjeta-resultado {
  position: relative;
  background: #ffffff;
  border-radius: 28px;
  padding: 40px 32px;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  overflow: hidden;
  transform: scale(0.85);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  box-shadow: 0 24px 80px rgba(59, 130, 246, 0.25), 0 4px 24px rgba(0, 0, 0, 0.15);
}

.tarjeta-resultado--visible {
  transform: scale(1);
  opacity: 1;
}

/* Stagger children */
.tarjeta-resultado__item {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(2) { transition-delay: 0.1s; opacity: 1; transform: none; }
.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(3) { transition-delay: 0.18s; opacity: 1; transform: none; }
.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(4) { transition-delay: 0.26s; opacity: 1; transform: none; }
.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(5) { transition-delay: 0.34s; opacity: 1; transform: none; }
.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(6) { transition-delay: 0.42s; opacity: 1; transform: none; }
.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(7) { transition-delay: 0.50s; opacity: 1; transform: none; }
.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(8) { transition-delay: 0.58s; opacity: 1; transform: none; }
.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(9) { transition-delay: 0.66s; opacity: 1; transform: none; }
.tarjeta-resultado--visible .tarjeta-resultado__item:nth-child(10) { transition-delay: 0.74s; opacity: 1; transform: none; }

.tarjeta-resultado__glow {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.tarjeta-resultado__foto-wrapper {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #3B82F6, #6366F1) border-box;
  flex-shrink: 0;
}

.tarjeta-resultado__foto {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tarjeta-resultado__foto-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 32px;
  font-weight: 800;
}

.tarjeta-resultado__emoji {
  font-size: 36px;
  line-height: 1;
  margin-top: -4px;
}

.tarjeta-resultado__perfil {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.tarjeta-resultado__nombre {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.tarjeta-resultado__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.tarjeta-resultado__tag {
  padding: 4px 12px;
  border-radius: 999px;
  background: #F3F4F6;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
}

.tarjeta-resultado__frase {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-style: italic;
  color: #6B7280;
  margin: 0;
  padding: 0 8px;
}

.tarjeta-resultado__descripcion {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  color: #374151;
  margin: 0;
}

.tarjeta-resultado__busca {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  color: #9CA3AF;
  margin: 0;
}

.tarjeta-resultado__busca strong {
  color: #6366F1;
}

.tarjeta-resultado__btn {
  margin-top: 8px;
  width: 100%;
  height: 48px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.18s, transform 0.12s;
}

.tarjeta-resultado__btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/tarjetaResultado/
git commit -m "feat: add TarjetaResultado animated component"
```

---

### Task 5: Onboarding page shell

**Files:**
- Create: `src/pages/onboarding/page.tsx`
- Create: `src/pages/onboarding/page.css`

- [ ] **Step 1: Create page.css**

```css
/* src/pages/onboarding/page.css */
.onboarding {
  min-height: 100svh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Header */
.onboarding__header {
  padding: 20px 32px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.onboarding__logo {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 18px;
  background: linear-gradient(135deg, #3B82F6 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  align-self: flex-start;
}

.onboarding__progreso-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.onboarding__progreso-texto {
  font-size: 12px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.onboarding__progreso-barra-wrap {
  width: 100%;
  height: 4px;
  background: #F3F4F6;
  border-radius: 999px;
  overflow: hidden;
}

.onboarding__progreso-barra {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #3B82F6, #6366F1);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Content */
.onboarding__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* Step wrapper for slide animation */
.onboarding__paso-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 32px 0;
  animation: slideEntrada 0.25s ease-out;
}

@keyframes slideEntrada {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Navigation */
.onboarding__nav {
  display: flex;
  gap: 12px;
  padding: 24px 32px 32px;
  justify-content: space-between;
}

.onboarding__btn-atras {
  height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  border: 1.5px solid #E5E7EB;
  background: transparent;
  color: #6B7280;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.18s, color 0.18s;
}

.onboarding__btn-atras:hover {
  border-color: #9CA3AF;
  color: #374151;
}

.onboarding__btn-siguiente {
  flex: 1;
  height: 48px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.18s, transform 0.12s;
}

.onboarding__btn-siguiente:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.onboarding__btn-siguiente:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* Step shared styles */
.paso__titulo {
  font-size: 26px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 6px;
}

.paso__subtitulo {
  font-size: 15px;
  color: #6B7280;
  margin: 0 0 28px;
}

.paso__pregunta {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 12px;
}

.paso__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.paso__limite {
  font-size: 12px;
  color: #9CA3AF;
  margin: 8px 0 0;
}

@media (max-width: 480px) {
  .onboarding__header {
    padding: 16px 20px 0;
  }
  .onboarding__paso-wrap {
    padding: 24px 20px 0;
  }
  .onboarding__nav {
    padding: 20px 20px 28px;
  }
  .paso__titulo {
    font-size: 22px;
  }
}
```

- [ ] **Step 2: Create page.tsx**

```tsx
// src/pages/onboarding/page.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { OnboardingData, ResultadoPerfil } from '../../types/onboarding'
import { calcularPerfil } from './scoring'
import Paso1Perfil from './pasos/paso1Perfil/Paso1Perfil'
import Paso2Pasiones from './pasos/paso2Pasiones/Paso2Pasiones'
import Paso3Sueno from './pasos/paso3Sueno/Paso3Sueno'
import Paso4Superpoderes from './pasos/paso4Superpoderes/Paso4Superpoderes'
import Paso5ComoTrabaja from './pasos/paso5ComoTrabaja/Paso5ComoTrabaja'
import Paso6SocioIdeal from './pasos/paso6SocioIdeal/Paso6SocioIdeal'
import Paso7Tinder from './pasos/paso7Tinder/Paso7Tinder'
import TarjetaResultado from '../../components/ui/tarjetaResultado/tarjetaResultado'
import './page.css'

const TOTAL_PASOS = 7

const DATA_INICIAL: OnboardingData = {
  nombre: '', ocupacion: '', foto: '', descripcion: '',
  pasiones: [],
  sueno: '', tieneIdea: '', ideaFrase: '',
  superpoderes: [],
  reaccionProblema: '', rolEnProyecto: '',
  perfilesBuscados: [], valoresImportantes: [], disponibilidad: '',
  millonDolares: '', problemaResolver: '', fraseRepresenta: '',
  admiraEmprendedor: '', mayorAprendizaje: '',
}

function esValido(paso: number, data: OnboardingData): boolean {
  switch (paso) {
    case 1: return data.nombre.trim() !== '' && data.ocupacion !== ''
    case 2: return data.pasiones.length >= 1
    case 3: return data.sueno !== '' && data.tieneIdea !== ''
    case 4: return data.superpoderes.length >= 1
    case 5: return data.reaccionProblema !== '' && data.rolEnProyecto !== ''
    case 6: return data.perfilesBuscados.length >= 1 && data.valoresImportantes.length === 3 && data.disponibilidad !== ''
    case 7: return (
      data.millonDolares.trim() !== '' &&
      data.problemaResolver.trim() !== '' &&
      data.fraseRepresenta.trim() !== '' &&
      data.admiraEmprendedor.trim() !== '' &&
      data.mayorAprendizaje.trim() !== ''
    )
    default: return false
  }
}

export default function OnboardingPage() {
  const [paso, setPaso] = useState(1)
  const [data, setData] = useState<OnboardingData>(DATA_INICIAL)
  const [resultado, setResultado] = useState<ResultadoPerfil | null>(null)
  const navigate = useNavigate()

  function onChange<K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) {
    setData((prev) => ({ ...prev, [campo]: valor }))
  }

  function siguiente() {
    if (paso < TOTAL_PASOS) {
      setPaso((p) => p + 1)
    } else {
      setResultado(calcularPerfil(data))
    }
  }

  function atras() {
    if (paso > 1) setPaso((p) => p - 1)
  }

  const pasos = [
    <Paso1Perfil key={1} data={data} onChange={onChange} />,
    <Paso2Pasiones key={2} data={data} onChange={onChange} />,
    <Paso3Sueno key={3} data={data} onChange={onChange} />,
    <Paso4Superpoderes key={4} data={data} onChange={onChange} />,
    <Paso5ComoTrabaja key={5} data={data} onChange={onChange} />,
    <Paso6SocioIdeal key={6} data={data} onChange={onChange} />,
    <Paso7Tinder key={7} data={data} onChange={onChange} />,
  ]

  return (
    <div className="onboarding">
      <div className="onboarding__header">
        <Link to="/" className="onboarding__logo">NÓMADAS</Link>
        <div className="onboarding__progreso-meta">
          <span className="onboarding__progreso-texto">Paso {paso} de {TOTAL_PASOS}</span>
        </div>
        <div className="onboarding__progreso-barra-wrap">
          <div
            className="onboarding__progreso-barra"
            style={{ width: `${(paso / TOTAL_PASOS) * 100}%` }}
          />
        </div>
      </div>

      <div className="onboarding__content">
        <div className="onboarding__paso-wrap" key={paso}>
          {pasos[paso - 1]}
        </div>
      </div>

      <div className="onboarding__nav">
        {paso > 1 && (
          <button className="onboarding__btn-atras" onClick={atras}>
            Atrás
          </button>
        )}
        <button
          className="onboarding__btn-siguiente"
          onClick={siguiente}
          disabled={!esValido(paso, data)}
        >
          {paso === TOTAL_PASOS ? 'Ver mi perfil' : 'Siguiente'}
        </button>
      </div>

      {resultado && (
        <TarjetaResultado
          resultado={resultado}
          nombre={data.nombre}
          foto={data.foto}
          superpoderes={data.superpoderes}
          fraseRepresenta={data.fraseRepresenta}
          onEntrar={() => navigate('/dashboard')}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/onboarding/page.tsx src/pages/onboarding/page.css
git commit -m "feat: add onboarding shell with progress bar and navigation"
```

---

### Task 6: Paso 1 — Perfil

**Files:**
- Create: `src/pages/onboarding/pasos/paso1Perfil/Paso1Perfil.tsx`
- Create: `src/pages/onboarding/pasos/paso1Perfil/Paso1Perfil.css`

- [ ] **Step 1: Create Paso1Perfil.css**

```css
/* src/pages/onboarding/pasos/paso1Perfil/Paso1Perfil.css */
.paso1__campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.paso1__label {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
}

.paso1__label span {
  color: #3B82F6;
}

.paso1__input {
  height: 44px;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  padding: 0 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.paso1__input:focus {
  border-color: #3B82F6;
}

.paso1__input::placeholder {
  color: #D1D5DB;
}

.paso1__foto-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}

.paso1__foto-preview {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #E5E7EB;
  flex-shrink: 0;
}

.paso1__foto-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 24px;
  flex-shrink: 0;
}

.paso1__foto-btn {
  padding: 8px 20px;
  border-radius: 999px;
  border: 1.5px solid #E5E7EB;
  background: transparent;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.18s;
}

.paso1__foto-btn:hover {
  border-color: #3B82F6;
  color: #3B82F6;
}

.paso1__foto-input {
  display: none;
}
```

- [ ] **Step 2: Create Paso1Perfil.tsx**

```tsx
// src/pages/onboarding/pasos/paso1Perfil/Paso1Perfil.tsx
import { useRef } from 'react'
import type { OnboardingData, Ocupacion } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import './Paso1Perfil.css'

const OCUPACIONES: Ocupacion[] = ['Estudiante', 'Profesional', 'Emprendedor', 'Freelancer', 'Otro']

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

export default function Paso1Perfil({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  function onFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange('foto', ev.target?.result as string ?? '')
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <h1 className="paso__titulo">👋 Cuéntanos sobre ti</h1>
      <p className="paso__subtitulo">¿Cómo te gustaría que te conozcan?</p>

      <div className="paso1__campo">
        <label className="paso1__label">Nombre <span>*</span></label>
        <input
          className="paso1__input"
          placeholder="Oscar Martínez"
          value={data.nombre}
          onChange={(e) => onChange('nombre', e.target.value)}
        />
      </div>

      <div className="paso1__campo">
        <label className="paso1__label">¿A qué te dedicas actualmente? <span>*</span></label>
        <div className="paso__badges">
          {OCUPACIONES.map((o) => (
            <BadgeSeleccionable
              key={o}
              label={o}
              seleccionado={data.ocupacion === o}
              onClick={() => onChange('ocupacion', o)}
            />
          ))}
        </div>
      </div>

      <div className="paso1__campo">
        <label className="paso1__label">Foto de perfil</label>
        <div className="paso1__foto-wrap">
          {data.foto ? (
            <img src={data.foto} alt="perfil" className="paso1__foto-preview" />
          ) : (
            <div className="paso1__foto-placeholder">📷</div>
          )}
          <button className="paso1__foto-btn" onClick={() => fileRef.current?.click()}>
            {data.foto ? 'Cambiar foto' : 'Subir foto'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="paso1__foto-input"
            onChange={onFoto}
          />
        </div>
      </div>

      <div className="paso1__campo">
        <label className="paso1__label">Descríbete en una frase</label>
        <input
          className="paso1__input"
          placeholder='"Apasionado por la tecnología."'
          value={data.descripcion}
          onChange={(e) => onChange('descripcion', e.target.value)}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/onboarding/pasos/paso1Perfil/
git commit -m "feat: add Paso1Perfil"
```

---

### Task 7: Paso 2 — Pasiones

**Files:**
- Create: `src/pages/onboarding/pasos/paso2Pasiones/Paso2Pasiones.tsx`
- Create: `src/pages/onboarding/pasos/paso2Pasiones/Paso2Pasiones.css`

- [ ] **Step 1: Create Paso2Pasiones.css**

```css
/* src/pages/onboarding/pasos/paso2Pasiones/Paso2Pasiones.css */
/* No extra styles needed beyond shared paso__ classes */
```

- [ ] **Step 2: Create Paso2Pasiones.tsx**

```tsx
// src/pages/onboarding/pasos/paso2Pasiones/Paso2Pasiones.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/onboarding/pasos/paso2Pasiones/
git commit -m "feat: add Paso2Pasiones"
```

---

### Task 8: Paso 3 — Sueño emprendedor

**Files:**
- Create: `src/pages/onboarding/pasos/paso3Sueno/Paso3Sueno.tsx`
- Create: `src/pages/onboarding/pasos/paso3Sueno/Paso3Sueno.css`

- [ ] **Step 1: Create Paso3Sueno.css**

```css
/* src/pages/onboarding/pasos/paso3Sueno/Paso3Sueno.css */
.paso3__seccion {
  margin-bottom: 28px;
}

.paso3__input {
  height: 44px;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  padding: 0 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
}

.paso3__input:focus {
  border-color: #3B82F6;
}

.paso3__input::placeholder {
  color: #D1D5DB;
}
```

- [ ] **Step 2: Create Paso3Sueno.tsx**

```tsx
// src/pages/onboarding/pasos/paso3Sueno/Paso3Sueno.tsx
import type { OnboardingData, TieneIdea } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import './Paso3Sueno.css'

const SUENOS = [
  'Una startup tecnológica', 'Una agencia', 'Un ecommerce',
  'Una empresa tradicional', 'Una empresa de impacto social', 'No lo tengo claro aún',
]

const TIENE_IDEA: TieneIdea[] = ['Sí', 'No', 'Tengo varias']

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

export default function Paso3Sueno({ data, onChange }: Props) {
  return (
    <div>
      <h1 className="paso__titulo">🚀 Tu sueño emprendedor</h1>
      <p className="paso__subtitulo">Cuéntanos adónde quieres llegar.</p>

      <div className="paso3__seccion">
        <p className="paso__pregunta">¿Qué te gustaría construir algún día?</p>
        <div className="paso__badges">
          {SUENOS.map((s) => (
            <BadgeSeleccionable
              key={s}
              label={s}
              seleccionado={data.sueno === s}
              onClick={() => onChange('sueno', s)}
            />
          ))}
        </div>
      </div>

      <div className="paso3__seccion">
        <p className="paso__pregunta">¿Ya tienes una idea de negocio?</p>
        <div className="paso__badges">
          {TIENE_IDEA.map((t) => (
            <BadgeSeleccionable
              key={t}
              label={t}
              seleccionado={data.tieneIdea === t}
              onClick={() => onChange('tieneIdea', t)}
            />
          ))}
        </div>

        {data.tieneIdea === 'Sí' && (
          <input
            className="paso3__input"
            placeholder="Cuéntanos tu idea en una frase..."
            value={data.ideaFrase}
            onChange={(e) => onChange('ideaFrase', e.target.value)}
          />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/onboarding/pasos/paso3Sueno/
git commit -m "feat: add Paso3Sueno"
```

---

### Task 9: Paso 4 — Superpoderes

**Files:**
- Create: `src/pages/onboarding/pasos/paso4Superpoderes/Paso4Superpoderes.tsx`
- Create: `src/pages/onboarding/pasos/paso4Superpoderes/Paso4Superpoderes.css`

- [ ] **Step 1: Create Paso4Superpoderes.css**

```css
/* src/pages/onboarding/pasos/paso4Superpoderes/Paso4Superpoderes.css */
.paso4__grupo {
  margin-bottom: 24px;
}

.paso4__grupo-titulo {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #9CA3AF;
  margin: 0 0 10px;
}
```

- [ ] **Step 2: Create Paso4Superpoderes.tsx**

```tsx
// src/pages/onboarding/pasos/paso4Superpoderes/Paso4Superpoderes.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/onboarding/pasos/paso4Superpoderes/
git commit -m "feat: add Paso4Superpoderes"
```

---

### Task 10: Paso 5 — Cómo trabajas

**Files:**
- Create: `src/pages/onboarding/pasos/paso5ComoTrabaja/Paso5ComoTrabaja.tsx`
- Create: `src/pages/onboarding/pasos/paso5ComoTrabaja/Paso5ComoTrabaja.css`

- [ ] **Step 1: Create Paso5ComoTrabaja.css**

```css
/* src/pages/onboarding/pasos/paso5ComoTrabaja/Paso5ComoTrabaja.css */
.paso5__seccion {
  margin-bottom: 28px;
}
```

- [ ] **Step 2: Create Paso5ComoTrabaja.tsx**

```tsx
// src/pages/onboarding/pasos/paso5ComoTrabaja/Paso5ComoTrabaja.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/onboarding/pasos/paso5ComoTrabaja/
git commit -m "feat: add Paso5ComoTrabaja"
```

---

### Task 11: Paso 6 — Socio ideal

**Files:**
- Create: `src/pages/onboarding/pasos/paso6SocioIdeal/Paso6SocioIdeal.tsx`
- Create: `src/pages/onboarding/pasos/paso6SocioIdeal/Paso6SocioIdeal.css`

- [ ] **Step 1: Create Paso6SocioIdeal.css**

```css
/* src/pages/onboarding/pasos/paso6SocioIdeal/Paso6SocioIdeal.css */
.paso6__seccion {
  margin-bottom: 28px;
}
```

- [ ] **Step 2: Create Paso6SocioIdeal.tsx**

```tsx
// src/pages/onboarding/pasos/paso6SocioIdeal/Paso6SocioIdeal.tsx
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
      <h1 className="paso__titulo">🤝 Tu socio ideal</h1>
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
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/onboarding/pasos/paso6SocioIdeal/
git commit -m "feat: add Paso6SocioIdeal"
```

---

### Task 12: Paso 7 — Preguntas Tinder

**Files:**
- Create: `src/pages/onboarding/pasos/paso7Tinder/Paso7Tinder.tsx`
- Create: `src/pages/onboarding/pasos/paso7Tinder/Paso7Tinder.css`

- [ ] **Step 1: Create Paso7Tinder.css**

```css
/* src/pages/onboarding/pasos/paso7Tinder/Paso7Tinder.css */
.paso7__campo {
  margin-bottom: 20px;
}

.paso7__label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
}

.paso7__input {
  width: 100%;
  height: 44px;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  padding: 0 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.paso7__input:focus {
  border-color: #3B82F6;
}

.paso7__input::placeholder {
  color: #D1D5DB;
}
```

- [ ] **Step 2: Create Paso7Tinder.tsx**

```tsx
// src/pages/onboarding/pasos/paso7Tinder/Paso7Tinder.tsx
import type { OnboardingData } from '../../../../types/onboarding'
import './Paso7Tinder.css'

type CampoTinder = 'millonDolares' | 'problemaResolver' | 'fraseRepresenta' | 'admiraEmprendedor' | 'mayorAprendizaje'

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

const PREGUNTAS: { campo: CampoTinder; label: string; placeholder: string }[] = [
  { campo: 'millonDolares', label: 'Si tuvieras 1 millón de dólares, ¿qué construirías?', placeholder: 'Una plataforma que...' },
  { campo: 'problemaResolver', label: '¿Qué problema del mundo te gustaría resolver?', placeholder: 'El acceso a...' },
  { campo: 'fraseRepresenta', label: '¿Qué frase te representa?', placeholder: '"Primero hazlo, luego hazlo bien."' },
  { campo: 'admiraEmprendedor', label: '¿Qué admiras en una persona emprendedora?', placeholder: 'La capacidad de...' },
  { campo: 'mayorAprendizaje', label: '¿Cuál ha sido tu mayor aprendizaje en la vida?', placeholder: 'Que el fracaso...' },
]

export default function Paso7Tinder({ data, onChange }: Props) {
  return (
    <div>
      <h1 className="paso__titulo">🔥 Preguntas Tinder</h1>
      <p className="paso__subtitulo">Estas son las que generan conexión real.</p>

      {PREGUNTAS.map(({ campo, label, placeholder }) => (
        <div key={campo} className="paso7__campo">
          <label className="paso7__label">{label}</label>
          <input
            className="paso7__input"
            placeholder={placeholder}
            value={data[campo]}
            onChange={(e) => onChange(campo, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/onboarding/pasos/paso7Tinder/
git commit -m "feat: add Paso7Tinder"
```

---

### Task 13: Dashboard placeholder

**Files:**
- Create: `src/pages/dashboard/page.tsx`
- Create: `src/pages/dashboard/page.css`

- [ ] **Step 1: Create page.css**

```css
/* src/pages/dashboard/page.css */
.dashboard {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  gap: 16px;
}

.dashboard__emoji {
  font-size: 64px;
}

.dashboard__titulo {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.dashboard__subtitulo {
  font-size: 15px;
  color: #9CA3AF;
  margin: 0;
}
```

- [ ] **Step 2: Create page.tsx**

```tsx
// src/pages/dashboard/page.tsx
import './page.css'

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="dashboard__emoji">🚀</div>
      <h1 className="dashboard__titulo">Bienvenido a Nómadas</h1>
      <p className="dashboard__subtitulo">Tu dashboard está en construcción.</p>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/dashboard/
git commit -m "feat: add Dashboard placeholder"
```

---

### Task 14: Routes + redirect from registro

**Files:**
- Modify: `src/routes/index.tsx`
- Modify: `src/pages/registrate/page.tsx`

- [ ] **Step 1: Add routes**

Replace the content of `src/routes/index.tsx` with:

```tsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/nomadas/layout'
import InicioPage from '../pages/inicio/page'
import NomidasPage from '../pages/nomadas/page'
import AliadosPage from '../pages/aliados/page'
import IniciarSesionPage from '../pages/iniciarSesion/page'
import RegistratePage from '../pages/registrate/page'
import OnboardingPage from '../pages/onboarding/page'
import DashboardPage from '../pages/dashboard/page'

const router = createBrowserRouter([
  { path: '/', element: <Layout><InicioPage /></Layout> },
  { path: '/nomada', element: <Layout><NomidasPage /></Layout> },
  { path: '/aliados', element: <Layout><AliadosPage /></Layout> },
  { path: '/iniciar-sesion', element: <IniciarSesionPage /> },
  { path: '/registrate', element: <RegistratePage /> },
  { path: '/onboarding', element: <OnboardingPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
])

export default router
```

- [ ] **Step 2: Wire up registro → onboarding**

In `src/pages/registrate/page.tsx`, add `useNavigate` and hook the button:

```tsx
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BulbOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons'
import AppButton from '../../components/ui/boton/boton'
import CampoTexto from '../../components/ui/campoTexto/campoTexto'
import './page.css'

export default function RegistratePage() {
  const navigate = useNavigate()
  const [aceptado, setAceptado] = useState(false)

  return (
    <div className="registro">
      <div className="registro__orbe" />
      <div className="registro__grid" />

      <Link to="/" className="registro__logo">NÓMADAS</Link>

      <div className="registro__card">
        <h1 className="registro__card-titulo">Crea tu cuenta</h1>
        <p className="registro__card-subtitulo">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/iniciar-sesion">Inicia sesión aquí</Link>
        </p>

        <div className="registro__campos">
          <div className="registro__fila">
            <CampoTexto label="Nombre" placeholder="Juana" requerido />
            <CampoTexto label="Apellido" placeholder="Pérez" requerido />
          </div>

          <CampoTexto
            label="Correo electrónico"
            tipo="email"
            placeholder="tu.correo@proveedor.es"
            requerido
          />

          <CampoTexto
            label="Contraseña"
            tipo="password"
            placeholder="tucontraseñaaquí"
            requerido
          />

          <label className="registro__terminos">
            <input
              type="checkbox"
              checked={aceptado}
              onChange={(e) => setAceptado(e.target.checked)}
            />
            <span className="registro__terminos-texto">
              Acepto los Términos y Condiciones
            </span>
          </label>

          <AppButton
            label="Regístrate aquí"
            disabled={!aceptado}
            onClick={() => navigate('/onboarding')}
          />
        </div>
      </div>

      <div className="registro__footer">
        <span className="registro__footer-badge">Base para emprendedores</span>
        <div className="registro__footer-items">
          <div className="registro__footer-item">
            <BulbOutlined className="registro__footer-icono" />
            Piénsalo.
          </div>
          <div className="registro__footer-item">
            <SettingOutlined className="registro__footer-icono" />
            Constrúyelo.
          </div>
          <div className="registro__footer-item">
            <LineChartOutlined className="registro__footer-icono" />
            Escálalo.
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Run: `pnpm dev`

Navigate to `http://localhost:5173/registrate`, check Términos y Condiciones, click "Regístrate aquí" → should land on `/onboarding`. Complete all 7 steps → result card should appear → click "Entrar a Nómadas" → should land on `/dashboard`.

- [ ] **Step 4: Commit**

```bash
git add src/routes/index.tsx src/pages/registrate/page.tsx
git commit -m "feat: wire onboarding and dashboard routes, connect registro flow"
```
