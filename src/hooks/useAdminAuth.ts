import { useEffect, useState } from 'react'
import { getSession, loginConEmail, logout, onAuthStateChange } from '../api/auth'
import type { Session } from '@supabase/supabase-js'

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      setCargando(false)
    })

    return onAuthStateChange((s) => setSession(s))
  }, [])

  async function login(email: string, password: string) {
    return loginConEmail(email, password)
  }

  return { session, cargando, login, logout }
}
