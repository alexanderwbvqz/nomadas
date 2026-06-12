# Onboarding Nómadas — Design Spec
**Fecha:** 2026-06-12  
**Estado:** Aprobado para implementación

---

## Resumen

Flujo de onboarding de 7 pasos que el usuario completa inmediatamente después de registrarse. Al finalizar, el sistema calcula un perfil emprendedor (CTO Builder, CMO Growth, etc.) y muestra una tarjeta resultado animada. Luego el usuario entra al dashboard.

Scope actual: **frontend puro**. Los datos viven en estado local. Preparado para conectar a Supabase en la siguiente iteración.

---

## Rutas

```
/registrate  →  /onboarding  →  /dashboard
```

`/dashboard` es un placeholder por ahora — solo la ruta registrada y una página vacía.

---

## Estructura de carpetas

```
src/
├── types/
│   └── onboarding.ts                  ← tipos compartidos entre todos los pasos
├── pages/
│   └── onboarding/
│       ├── page.tsx                   ← orquestador: estado global + renderiza paso activo
│       ├── page.css
│       └── pasos/
│           ├── paso1Perfil/
│           │   ├── Paso1Perfil.tsx
│           │   └── Paso1Perfil.css
│           ├── paso2Pasiones/
│           │   ├── Paso2Pasiones.tsx
│           │   └── Paso2Pasiones.css
│           ├── paso3Sueno/
│           │   ├── Paso3Sueno.tsx
│           │   └── Paso3Sueno.css
│           ├── paso4Superpoderes/
│           │   ├── Paso4Superpoderes.tsx
│           │   └── Paso4Superpoderes.css
│           ├── paso5ComoTrabaja/
│           │   ├── Paso5ComoTrabaja.tsx
│           │   └── Paso5ComoTrabaja.css
│           ├── paso6SocioIdeal/
│           │   ├── Paso6SocioIdeal.tsx
│           │   └── Paso6SocioIdeal.css
│           └── paso7Tinder/
│               ├── Paso7Tinder.tsx
│               └── Paso7Tinder.css
└── components/ui/
    ├── badgeSeleccionable/
    │   ├── badgeSeleccionable.tsx
    │   ├── badgeSeleccionable.css
    │   └── badgeSeleccionable.types.ts
    └── tarjetaResultado/
        ├── tarjetaResultado.tsx
        ├── tarjetaResultado.css
        └── tarjetaResultado.types.ts
```

---

## Tipos — `src/types/onboarding.ts`

```ts
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

---

## Componente `BadgeSeleccionable`

Componente reutilizable usado en los pasos 2, 4 y 6.

**Props:**
- `label: string`
- `seleccionado: boolean`
- `onClick: () => void`
- `deshabilitado?: boolean` — cuando se alcanza el límite de selección

**Estados visuales:**
- Normal: fondo gris suave (`#F3F4F6`), texto oscuro
- Seleccionado: gradiente azul-violeta (`#3B82F6` → `#6366F1`), texto blanco
- Deshabilitado: opacidad 0.4, cursor not-allowed

---

## Contenido de cada paso

### Paso 1 — Cuéntanos sobre ti
- Input texto: Nombre *(requerido)*
- Selección única: Ocupación — Estudiante / Profesional / Emprendedor / Freelancer / Otro *(requerido)*
- Upload foto de perfil *(opcional)*
- Input texto: Descripción en una frase *(opcional, placeholder con ejemplos)*

### Paso 2 — ¿Qué te apasiona?
- Selección múltiple hasta 5: Tecnología, IA, Marketing, Ventas, Finanzas, Startups, Educación, Salud, Turismo, Gastronomía, Moda, Deportes, Videojuegos, Contenido digital *(mínimo 1 requerido)*

### Paso 3 — Tu sueño emprendedor
- Selección única: Una startup tecnológica / Una agencia / Un ecommerce / Una empresa tradicional / Una empresa de impacto social / No lo tengo claro aún *(requerido)*
- Selección única: ¿Ya tienes una idea? Sí / No / Tengo varias *(requerido)*
- Input condicional: si `tieneIdea === 'Sí'` → input "Cuéntanos tu idea en una frase"

### Paso 4 — Tus superpoderes
Selección múltiple hasta 10, agrupada por categoría:
- **Tecnología:** Programación, IA, Desarrollo Web, Desarrollo Móvil, UX/UI, Automatización, Bases de Datos
- **Marketing:** Marketing Digital, Redes Sociales, Branding, Diseño, Copywriting, SEO
- **Ventas:** Negociación, Prospección, Cierre de ventas, Atención al cliente, Presentaciones
- **Finanzas:** Contabilidad, Finanzas, Costos, Excel, Modelos financieros
- **Operaciones:** Gestión de proyectos, Logística, Procesos, RRHH, Organización

*(Mínimo 1 requerido)*

### Paso 5 — ¿Cómo trabajas?
- Selección única: Reacción ante un problema — Lo analizo / Hablo con clientes / Busco una solución técnica / Organizo al equipo / Pienso ideas nuevas *(requerido)*
- Selección única: Rol en proyecto — Construye el producto / Consigue clientes / Organiza el trabajo / Analiza números / Diseña estrategias *(requerido)*

### Paso 6 — Tu socio ideal
- Selección múltiple: Perfiles buscados — Tecnología / Marketing / Ventas / Finanzas / Operaciones *(mínimo 1 requerido)*
- Selección múltiple hasta 3: Valores — Honestidad, Compromiso, Ambición, Creatividad, Responsabilidad, Comunicación, Liderazgo, Trabajo en equipo *(exactamente 3 requerido)*
- Selección única: Disponibilidad — Menos de 5h / 5-10h / 10-20h / Más de 20h *(requerido)*

### Paso 7 — Preguntas Tinder 🔥
Cinco inputs de texto corto *(todos requeridos)*:
1. Si tuvieras 1 millón de dólares, ¿qué construirías?
2. ¿Qué problema del mundo te gustaría resolver?
3. ¿Qué frase te representa?
4. ¿Qué admiras en una persona emprendedora?
5. ¿Cuál ha sido tu mayor aprendizaje en la vida?

---

## Lógica de Scoring

### Pesos por paso
| Paso | Multiplicador |
|---|---|
| Paso 4 — Superpoderes | ×3 |
| Paso 5 — Cómo trabajas | ×2 |
| Paso 3 — Sueño | ×1.5 |
| Paso 2 — Pasiones | ×1 |
| Paso 6 — Socio ideal (inverso) | ×1 |

### Mapeo de respuestas a categorías

**Paso 4 — Superpoderes (×3 cada selección):**
- Tecnología: Programación, IA, Desarrollo Web, Desarrollo Móvil, UX/UI, Automatización, Bases de Datos
- Marketing: Marketing Digital, Redes Sociales, Branding, Diseño, Copywriting, SEO
- Ventas: Negociación, Prospección, Cierre de ventas, Atención al cliente, Presentaciones
- Finanzas: Contabilidad, Finanzas, Costos, Excel, Modelos financieros
- Operaciones: Gestión de proyectos, Logística, Procesos, RRHH, Organización

**Paso 5 — Reacción ante problema (×2):**
- Tecnología: "Busco una solución técnica"
- Ventas: "Hablo con clientes"
- Finanzas: "Lo analizo"
- Operaciones: "Organizo al equipo"
- Marketing: "Pienso ideas nuevas"

**Paso 5 — Rol en proyecto (×2):**
- Tecnología: "Construye el producto"
- Ventas: "Consigue clientes"
- Operaciones: "Organiza el trabajo"
- Finanzas: "Analiza números"
- Marketing: "Diseña estrategias"

**Paso 3 — Sueño (×1.5):**
- Tecnología: "Una startup tecnológica"
- Marketing: "Una agencia"
- Ventas: "Un ecommerce"
- Finanzas: "Una empresa tradicional"
- Operaciones: "Una empresa de impacto social"

**Paso 2 — Pasiones (×1):**
- Tecnología: Tecnología, IA, Videojuegos
- Marketing: Marketing, Contenido digital, Moda
- Ventas: Ventas, Turismo, Gastronomía
- Finanzas: Finanzas, Startups
- Operaciones: Educación, Salud, Deportes

**Paso 6 — Socio ideal (inverso ×1):** Lo que se busca suma a las categorías que NO es el usuario — no afecta el score propio, solo se usa para mostrar en la tarjeta resultado.

### Regla de validación del perfil
El perfil ganador debe tener al menos **25% más puntos** que el segundo lugar:

```
ganador = max(scores)
segundo = segundoMayor(scores)
si ganador >= segundo * 1.25 → mostrar perfil específico
si no → "Co-Founder Generalista"
```

### Tabla de perfiles
| Categoría ganadora | Perfil | Emoji |
|---|---|---|
| Tecnología | CTO Builder | 💻 |
| Marketing | CMO Growth | 📢 |
| Ventas | Sales Hunter | 🎯 |
| Finanzas | CFO Strategist | 💰 |
| Operaciones | COO Executor | ⚙️ |
| Empate / distribución | Co-Founder Generalista | 🦄 |

---

## Tarjeta Resultado

Mostrada después del paso 7, antes del dashboard.

**Contenido:**
```
[foto de perfil]
💻 CTO Builder
Oscar Martínez
IA • Desarrollo Web • Startups
"Quiero construir productos que impacten a millones."
Busca: Marketing + Ventas
[ Entrar a Nómadas ]
```

**Animación (CSS puro, sin librerías):**
1. Fondo hace fade-in (200ms)
2. Tarjeta escala de 0.8 → 1 con ease-out (300ms, delay 100ms)
3. Elementos internos aparecen uno a uno con stagger de 100ms cada uno

---

## Navegación entre pasos

- Barra de progreso en la parte superior: se llena proporcionalmente + texto "Paso X de 7"
- Botón **Siguiente** — valida campos requeridos del paso actual antes de avanzar
- Botón **Atrás** — siempre disponible, sin validación
- Paso 7: botón dice **"Ver mi perfil"** en lugar de "Siguiente"
- Transición entre pasos: slide horizontal — paso actual sale hacia izquierda, nuevo entra desde derecha

### Validaciones mínimas por paso
| Paso | Campos requeridos |
|---|---|
| 1 | Nombre + Ocupación |
| 2 | Mínimo 1 pasión |
| 3 | Sueño + TieneIdea |
| 4 | Mínimo 1 superpoder |
| 5 | Reacción + Rol |
| 6 | Mínimo 1 perfil buscado + exactamente 3 valores + disponibilidad |
| 7 | Los 5 textos cortos |

---

## Estilo visual

- Fondo blanco, tipografía limpia
- Consistente con sistema de diseño existente (Plus Jakarta Sans, azul #3B82F6, gradiente azul-violeta)
- Sin barra de navegación ni footer — pantalla completa dedicada al onboarding
- Logo "NÓMADAS" en la parte superior como en registro/login
