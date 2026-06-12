# Button Component — Design Spec

**Date:** 2026-06-02
**Project:** Nomadas

---

## Overview

Reusable primary button component that wraps Ant Design's `Button`. Supports two variants: texto solo, o ícono izquierda + texto.

---

## Files

| Archivo | Responsabilidad |
|---|---|
| `src/components/ui/Button.tsx` | JSX del componente |
| `src/components/ui/Button.types.ts` | Interfaces y tipos |
| `src/components/ui/Button.css` | Estilos visuales |

---

## Props

```ts
interface AppButtonProps {
  label: string           // texto del botón (requerido)
  icon?: ReactNode        // ícono opcional, siempre a la izquierda
  onClick?: () => void
  disabled?: boolean
}
```

---

## Visual

- **Fondo:** gradiente `linear-gradient(135deg, #f5a623 0%, #ff6b35 100%)`
- **Texto:** blanco `#ffffff`, Syne 700, 13px, uppercase, letter-spacing 0.5px
- **Altura:** 40px
- **Border-radius:** 8px
- **Padding:** 0 22px
- **Sombra:** `0 2px 12px rgba(245, 166, 35, 0.3)`
- **Hover:** translateY(-1px) + sombra aumentada
- **Con ícono:** gap de 8px entre ícono y texto, ícono alineado a la izquierda

---

## Uso

```tsx
// Solo texto
<AppButton label="Iniciar sesión" />

// Ícono + texto
<AppButton label="Explorar" icon={<SearchOutlined />} />

// Con handler
<AppButton label="Unirse" icon={<UserAddOutlined />} onClick={() => {}} />
```

---

## Decisiones

- Wrapper sobre `Button` de Ant Design para heredar accesibilidad y estados (disabled, loading) sin reimplementarlos.
- Nombre `AppButton` para evitar colisión con el `Button` de antd en el mismo archivo.
- Un solo estilo primario (naranja). Sin variantes por ahora (YAGNI).
- Ícono solo a la izquierda.
