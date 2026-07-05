import { useState, useEffect } from 'react'
import { getMetricas } from '../api/metricas'

interface Metricas {
  nomadas: number
  aliados: number
}

export function useMetricas(): Metricas {
  const [nomadas, setNomadas] = useState(0)
  const [aliados, setAliados] = useState(0)

  useEffect(() => {
    getMetricas().then(({ nomadas, aliados }) => {
      setNomadas(nomadas)
      setAliados(aliados)
    })
  }, [])

  return { nomadas, aliados }
}
