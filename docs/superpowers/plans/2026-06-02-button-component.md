# Button Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reusable primary `AppButton` component that wraps Ant Design's Button, supports optional left icon, and follows the project's file separation rule (.tsx / .types.ts / .css).

**Architecture:** Wrapper over `antd` Button with a single primary style (orange gradient). Props are typed in a separate `.types.ts` file. All visual rules live in `Button.css`. The component file contains only JSX.

**Tech Stack:** React, TypeScript, Ant Design, CSS

---

### Task 1: Tipos — Button.types.ts

**Files:**
- Create: `src/components/ui/Button.types.ts`

- [ ] **Step 1: Crear el archivo de tipos**

```ts
import type { ReactNode } from 'react'

export interface AppButtonProps {
  label: string
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
}
```

- [ ] **Step 2: Verificar que no hay errores de TypeScript**

```bash
pnpm tsc --noEmit
```
Expected: sin output (sin errores).

---

### Task 2: Estilos — Button.css

**Files:**
- Create: `src/components/ui/Button.css`

- [ ] **Step 1: Crear el archivo de estilos**

```css
.app-btn {
  height: 40px !important;
  padding: 0 22px !important;
  background: linear-gradient(135deg, #f5a623 0%, #ff6b35 100%) !important;
  border: none !important;
  border-radius: 8px !important;
  font-family: 'Syne', sans-serif !important;
  font-weight: 700 !important;
  font-size: 13px !important;
  letter-spacing: 0.5px !important;
  color: #ffffff !important;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 2px 12px rgba(245, 166, 35, 0.3);
  text-transform: uppercase;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px;
}

.app-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(245, 166, 35, 0.45) !important;
  background: linear-gradient(135deg, #f5a623 0%, #ff6b35 100%) !important;
  color: #ffffff !important;
}

.app-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.app-btn__icon {
  display: flex;
  align-items: center;
  font-size: 15px;
}
```

---

### Task 3: Componente — Button.tsx

**Files:**
- Create: `src/components/ui/Button.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
import { Button } from 'antd'
import type { AppButtonProps } from './Button.types'
import './Button.css'

export default function AppButton({ label, icon, onClick, disabled }: AppButtonProps) {
  return (
    <Button
      className="app-btn"
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="app-btn__icon">{icon}</span>}
      {label}
    </Button>
  )
}
```

- [ ] **Step 2: Verificar tipos**

```bash
pnpm tsc --noEmit
```
Expected: sin output.

- [ ] **Step 3: Verificar build**

```bash
pnpm build
```
Expected: `✓ built in X.XXs` sin errores.

---

### Task 4: Usar AppButton en el Navbar

**Files:**
- Modify: `src/components/ui/Navbar.tsx`

- [ ] **Step 1: Reemplazar el Button de antd por AppButton**

En `Navbar.tsx`, reemplazar la importación:
```tsx
// quitar:
import { Button } from 'antd'

// agregar:
import AppButton from './Button'
```

Reemplazar el JSX del botón CTA:
```tsx
// quitar:
<div className="navbar__cta">
  <Button className="navbar__btn" onClick={() => {}}>
    Iniciar sesión
  </Button>
</div>

// agregar:
<div className="navbar__cta">
  <AppButton label="Iniciar sesión" />
</div>
```

Eliminar también `.navbar__btn` de `Navbar.css` ya que no se usará más.

- [ ] **Step 2: Verificar build final**

```bash
pnpm build
```
Expected: `✓ built in X.XXs` sin errores.
