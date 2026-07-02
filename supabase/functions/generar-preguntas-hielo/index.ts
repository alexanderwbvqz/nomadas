import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Perfiles sin pregunta_hielo
  const { data: perfiles, error } = await supabase
    .from('perfil_tinder')
    .select(`
      perfil_id,
      pregunta_hielo,
      perfiles_datos(ocupacion),
      perfil_resultado(categoria, descripcion),
      perfil_pasiones(pasion),
      perfil_superpoderes(superpoder),
      perfil_suenos(sueno)
    `)
    .is('pregunta_hielo', null)
    .limit(10)

  if (error || !perfiles) {
    return new Response(JSON.stringify({ error: error?.message ?? 'Sin datos' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let procesados = 0
  let errores = 0

  for (const p of perfiles) {
    type Single<T> = T[]
    const ocupacion = (p.perfiles_datos as Single<{ ocupacion: string }>)?.[0]?.ocupacion ?? ''
    const categoria = (p.perfil_resultado as Single<{ categoria: string }>)?.[0]?.categoria ?? ''
    const sueno = (p.perfil_suenos as Single<{ sueno: string }>)?.[0]?.sueno ?? ''
    const pasiones = (p.perfil_pasiones as Single<{ pasion: string }>)?.map((x) => x.pasion).join(', ') ?? ''
    const superpoderes = (p.perfil_superpoderes as Single<{ superpoder: string }>)?.map((x) => x.superpoder).join(', ') ?? ''

    const prompt = `Eres un experto en networking entre emprendedores. Genera UNA sola pregunta corta, curiosa e interesante para iniciar una conversación con esta persona. La pregunta debe ser directa, relevante a su perfil y fácil de responder. Máximo 20 palabras. Sin comillas.

Perfil:
- Categoría: ${categoria}
- Ocupación: ${ocupacion}
- Pasiones: ${pasiones}
- Superpoderes: ${superpoderes}
- Sueño: ${sueno || 'No especificado'}

Responde ÚNICAMENTE con la pregunta, sin texto adicional.`

    try {
      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.8,
          max_tokens: 60,
        }),
      })
      const json = await res.json()
      const pregunta = json.choices?.[0]?.message?.content?.trim()

      if (pregunta) {
        await supabase.from('perfil_tinder').update({ pregunta_hielo: pregunta }).eq('perfil_id', p.perfil_id)
        procesados++
      } else {
        errores++
      }
    } catch {
      errores++
    }
  }

  return new Response(
    JSON.stringify({ procesados, errores, total: perfiles.length }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
})
