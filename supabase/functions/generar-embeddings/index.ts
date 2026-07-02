import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

  const { data: perfiles, error } = await supabase
    .from('perfiles_datos')
    .select('id, perfil_resultado(descripcion)')
    .is('embedding', null)
    .eq('aprobado', true)
    .limit(10)

  if (error || !perfiles) {
    return new Response(JSON.stringify({ error: error?.message ?? 'Sin datos' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // @ts-ignore
  const session = new Supabase.ai.Session('gte-small')

  let procesados = 0
  let errores = 0
  const erroresDetalle: string[] = []

  for (const perfil of perfiles) {
    type Resultado = Array<{ descripcion: string }>
    const descripcion = (perfil.perfil_resultado as Resultado)?.[0]?.descripcion
    if (!descripcion) continue

    try {
      const output = await session.run(descripcion, { mean_pool: true, normalize: true })
      // output puede ser Float32Array directamente o { data: Float32Array }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = (output as any)?.data ?? output
      const embedding = Array.from(raw as Float32Array)

      const { error: updateError } = await supabase
        .from('perfiles_datos')
        .update({ embedding })
        .eq('id', perfil.id)

      if (updateError) {
        errores++
        erroresDetalle.push(`update(${perfil.id}): ${updateError.message}`)
      } else {
        procesados++
      }
    } catch (e) {
      errores++
      erroresDetalle.push(`run(${perfil.id}): ${String(e)}`)
    }
  }

  return new Response(
    JSON.stringify({ procesados, errores, total: perfiles.length, erroresDetalle }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
})
