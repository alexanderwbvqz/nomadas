import { supabase } from '../lib/supabase'
import type { Session, AuthError } from '@supabase/supabase-js'

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function loginConEmail(email: string, password: string): Promise<AuthError | null> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  return error
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut()
}

export function onAuthStateChange(callback: (session: Session | null) => void): () => void {
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
  return () => listener.subscription.unsubscribe()
}
