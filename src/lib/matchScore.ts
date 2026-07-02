import type { MatchPerfil } from '../hooks/useMatchPerfil'

const CATEGORIAS = ['Tecnología', 'Marketing - Ventas', 'Operaciones', 'Finanzas']

// ── Fallback: fórmula sin embeddings ─────────────────────────────────────────

function calcularScore(owner: MatchPerfil, candidato: MatchPerfil): number {
  const pasiones = candidato.pasiones.filter((p) => owner.pasiones.includes(p)).length
  const superpoderes = candidato.superpoderes.filter((s) => owner.superpoderes.includes(s)).length
  const esComplementario = candidato.categoria !== owner.categoria ? 20 : 0
  return esComplementario + pasiones * 3 + superpoderes * 2
}

function scoreToAfinidad(score: number, esComplementario: boolean): number {
  const base = esComplementario ? 70 : 55
  return Math.min(99, base + score)
}

export function distribuirMatches(candidatos: MatchPerfil[], owner: MatchPerfil): MatchPerfil[] {
  const complementarias = CATEGORIAS.filter((c) => c !== owner.categoria)
  const resultado: MatchPerfil[] = []

  for (const cat of complementarias) {
    const grupo = candidatos
      .filter((c) => c.categoria === cat)
      .sort((a, b) => calcularScore(owner, b) - calcularScore(owner, a))
      .slice(0, 3)
      .map((c) => ({ ...c, afinidad: scoreToAfinidad(calcularScore(owner, c), true) }))
    resultado.push(...grupo)
  }

  const mismaCategoria = candidatos
    .filter((c) => c.categoria === owner.categoria)
    .sort((a, b) => calcularScore(owner, b) - calcularScore(owner, a))
    .slice(0, 1)
    .map((c) => ({ ...c, afinidad: scoreToAfinidad(calcularScore(owner, c), false) }))
  resultado.push(...mismaCategoria)

  if (resultado.length < 10) {
    const yaIds = new Set(resultado.map((r) => r.id))
    const restantes = candidatos
      .filter((c) => !yaIds.has(c.id))
      .sort((a, b) => calcularScore(owner, b) - calcularScore(owner, a))
      .slice(0, 10 - resultado.length)
      .map((c) => ({ ...c, afinidad: scoreToAfinidad(calcularScore(owner, c), c.categoria !== owner.categoria) }))
    resultado.push(...restantes)
  }

  return resultado.slice(0, 10)
}

// ── Embeddings: distribución por similitud vectorial ─────────────────────────

export type CandidatoConSimilitud = MatchPerfil & { similarity: number }

function similaridadToAfinidad(similarity: number, esComplementario: boolean): number {
  // similarity ∈ [0, 1]; complementarios base 70 %, misma cat base 55 %
  const base = esComplementario ? 70 : 55
  return Math.min(99, Math.round(base + similarity * 29))
}

export function distribuirPorSimilitud(
  candidatos: CandidatoConSimilitud[],
  ownerCategoria: string
): MatchPerfil[] {
  const complementarias = CATEGORIAS.filter((c) => c !== ownerCategoria)
  const resultado: MatchPerfil[] = []

  for (const cat of complementarias) {
    const grupo = candidatos
      .filter((c) => c.categoria === cat)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
      .map((c) => ({ ...c, afinidad: similaridadToAfinidad(c.similarity, true) }))
    resultado.push(...grupo)
  }

  const mismaCategoria = candidatos
    .filter((c) => c.categoria === ownerCategoria)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 1)
    .map((c) => ({ ...c, afinidad: similaridadToAfinidad(c.similarity, false) }))
  resultado.push(...mismaCategoria)

  if (resultado.length < 10) {
    const yaIds = new Set(resultado.map((r) => r.id))
    const restantes = candidatos
      .filter((c) => !yaIds.has(c.id))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10 - resultado.length)
      .map((c) => ({ ...c, afinidad: similaridadToAfinidad(c.similarity, c.categoria !== ownerCategoria) }))
    resultado.push(...restantes)
  }

  return resultado.slice(0, 10)
}
