import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const PERFILES = ['CTO Builder', 'CMO', 'CFO Strategist', 'COO Executor', 'Co-Founder Generalista']

const DESCRIPCIONES: Record<string, string> = {
  'CTO Builder': 'Le encanta construir productos. Piensa en soluciones tecnológicas.',
  'CMO': 'Nació para conectar con clientes y cerrar tratos. Combina marketing y ventas.',
  'CFO Strategist': 'Analiza oportunidades. Piensa en rentabilidad y modelos de negocio.',
  'COO Executor': 'Convierte el caos en sistemas. Hace que las cosas sucedan.',
  'Co-Founder Generalista': 'Tienes habilidades distribuidas. Eres el pegamento del equipo.',
}

const CAMPOS_REQUERIDOS = [
  'nombre', 'ocupacion', 'sueno', 'tieneIdea',
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

  const prompt = `Eres un experto en perfiles de cofundadores de startups. Analiza el siguiente perfil y asigna uno de estos roles: ${PERFILES.join(', ')}.

DATOS DEL USUARIO:
- Nombre: ${data.nombre}
- Ocupación: ${data.ocupacion}
- Pasiones: ${(data.pasiones as string[]).join(', ')}
- Sueño emprendedor: ${data.sueno}
- Tiene idea: ${data.tieneIdea}${data.ideaFrase ? ` — "${data.ideaFrase}"` : ''}
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
  "perfil": "<uno de los 5 perfiles>",
  "razon": "<explicación breve de 1-2 oraciones de por qué este perfil>"
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

  const perfil = PERFILES.includes(content.perfil) ? content.perfil : 'Co-Founder Generalista'

  return new Response(
    JSON.stringify({
      perfil,
      descripcion: content.razon || DESCRIPCIONES[perfil],
      busca: data.perfilesBuscados ?? [],
      scores: { Tecnología: 0, Ventas: 0, Finanzas: 0, Operaciones: 0 },
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  )
})
