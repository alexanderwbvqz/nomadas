import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const CATEGORIAS = ['Tecnología', 'Marketing - Ventas', 'Operaciones', 'Finanzas']

const DESCRIPCIONES: Record<string, string> = {
  'Tecnología':       'Piensa en soluciones técnicas y le apasiona construir productos digitales.',
  'Marketing - Ventas': 'Nació para conectar con clientes, posicionar marcas y cerrar tratos.',
  'Operaciones':      'Convierte el caos en sistemas. Hace que las cosas sucedan con eficiencia.',
  'Finanzas':         'Analiza oportunidades, cuida los números y piensa en rentabilidad.',
}

const CAMPOS_REQUERIDOS = [
  'nombre', 'ocupacion',
  'millonDolares', 'problemaResolver', 'fraseRepresenta',
  'admiraEmprendedor', 'mayorAprendizaje',
]

function esRequestValida(data: Record<string, unknown>): boolean {
  for (const campo of CAMPOS_REQUERIDOS) {
    const valor = data[campo]
    if (!valor || typeof valor !== 'string' || valor.trim().length < 3) return false
  }
  if (!Array.isArray(data.pasiones) || data.pasiones.length === 0) return false
  if (!Array.isArray(data.superpoderes) || data.superpoderes.length === 0) return false
  return true
}

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'No autorizado' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  let data: Record<string, unknown>
  try {
    data = await req.json()
  } catch {
    return new Response(
      JSON.stringify({ error: 'Body inválido' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  if (!esRequestValida(data)) {
    return new Response(
      JSON.stringify({ error: 'Datos incompletos' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const prompt = `Eres un experto en perfiles de cofundadores de startups. Analiza el siguiente perfil y clasifícalo en UNA de estas 4 categorías: ${CATEGORIAS.join(', ')}.

DATOS DEL USUARIO:
- Nombre: ${data.nombre}
- Ocupación: ${data.ocupacion}
- Pasiones: ${(data.pasiones as string[]).join(', ')}
- Sueño emprendedor: ${data.sueno || 'No especificado'}
- Tiene idea de negocio: ${data.tieneIdea || 'No especificado'}
- Superpoderes: ${(data.superpoderes as string[]).join(', ')}
- Perfiles que busca en un socio: ${(data.perfilesBuscados as string[] ?? []).join(', ')}
- Valores importantes: ${(data.valoresImportantes as string[] ?? []).join(', ')}
- Disponibilidad semanal: ${data.disponibilidad}
- Si tuviera 1 millón de dólares construiría: "${data.millonDolares}"
- Problema del mundo que resolvería: "${data.problemaResolver}"
- Frase que lo representa: "${data.fraseRepresenta}"
- Lo que admira en un emprendedor: "${data.admiraEmprendedor}"
- Mayor aprendizaje en la vida: "${data.mayorAprendizaje}"

Responde ÚNICAMENTE con un JSON con esta estructura exacta, sin texto adicional:
{
  "categoria": "<una de las 4 categorías exactamente>",
  "descripcion": "<2-3 oraciones personalizadas explicando por qué esta persona encaja en esa categoría, basándote en sus habilidades, pasiones y respuestas. NO menciones nombres de perfiles como CTO Builder, Growth Hacker, CFO, COO ni similares. Habla directamente de la persona.>"
}`

  const groqRes = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  })

  const groqData = await groqRes.json()
  const content = JSON.parse(groqData.choices[0].message.content)

  const categoria = CATEGORIAS.includes(content.categoria) ? content.categoria : 'Tecnología'
  const descripcion = content.descripcion || DESCRIPCIONES[categoria]

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: fila, error: errorPerfil } = await supabase
    .from('perfiles_datos')
    .insert({
      nombre: data.nombre,
      email: data.email,
      whatsapp: data.whatsapp,
      ocupacion: data.ocupacion,
      foto: data.foto || null,
    })
    .select('id')
    .single()

  if (errorPerfil || !fila) {
    return new Response(
      JSON.stringify({ error: 'Error guardando perfil', detail: errorPerfil?.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const pid = fila.id
  const inserts: Promise<unknown>[] = [
    supabase.from('perfil_pasiones').insert(
      (data.pasiones as string[]).map((pasion) => ({ perfil_id: pid, pasion }))
    ),
    supabase.from('perfil_superpoderes').insert(
      (data.superpoderes as string[]).map((superpoder) => ({ perfil_id: pid, superpoder }))
    ),
    supabase.from('perfil_preferencias').insert({
      perfil_id: pid,
      perfiles_buscados: data.perfilesBuscados,
      valores_importantes: data.valoresImportantes,
      disponibilidad: data.disponibilidad,
    }),
    supabase.from('perfil_tinder').insert({
      perfil_id: pid,
      millon_dolares: data.millonDolares,
      problema_resolver: data.problemaResolver,
      frase_representa: data.fraseRepresenta,
      admira_emprendedor: data.admiraEmprendedor,
      mayor_aprendizaje: data.mayorAprendizaje,
    }),
    supabase.from('perfil_suenos').insert({
      perfil_id: pid,
      sueno: data.sueno || null,
      tiene_idea: data.tieneIdea || null,
    }),
    supabase.from('perfil_resultado').insert({
      perfil_id: pid,
      categoria,
      descripcion,
      busca: (data.perfilesBuscados as string[]).join(', '),
    }),
  ]
  if (data.ideaFrase) {
    inserts.push(supabase.from('perfil_ideas').insert({ perfil_id: pid, idea: data.ideaFrase }))
  }
  await Promise.all(inserts)

  return new Response(
    JSON.stringify({
      categoria,
      descripcion,
      busca: data.perfilesBuscados ?? [],
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  )
})
