import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

const FROM = '"Nómadas" <nomadas.comunidad@gmail.com>'
const PLATFORM_URL = 'https://somosnomadas.vercel.app'

type TipoCorreo = 'registro' | 'aprobado' | 'rechazado' | 'ceo_invitacion'

interface CorreoPayload {
  tipo: TipoCorreo
  nombre?: string
  email?: string
  motivo?: string
  sesionId?: string
  eventoId?: string
  url?: string
}

function fila(label: string, valor: string): string {
  return `<tr>
    <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="140" style="font-size:13px;color:#9CA3AF;vertical-align:top;">${label}</td>
          <td style="font-size:13px;font-weight:600;color:#111827;">${valor}</td>
        </tr>
      </table>
    </td>
  </tr>`
}

function htmlBase(contenido: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <tr><td>
      <p style="margin:0 0 28px;font-size:16px;font-weight:800;color:#111827;letter-spacing:0.08em;">NÓMADAS</p>
      ${contenido}
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;border-top:1px dashed #E5E7EB;">
        <tr><td style="padding-top:20px;">
          <p style="margin:0;font-size:12px;color:#9CA3AF;">© ${new Date().getFullYear()} Nómadas — Conectando cofundadores</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function htmlRegistro(nombre: string): string {
  return htmlBase(`
    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">Hemos recibido tu registro</p>
    <p style="margin:0 0 24px;font-size:15px;color:#6B7280;line-height:1.6;">Estamos revisando tu información. Te notificaremos cuando hayamos tomado una decisión.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:8px;padding:0 16px;">
      <tbody>
        ${fila('Nombre', nombre)}
        ${fila('Estado', 'En revisión')}
        ${fila('Tiempo estimado', 'Máximo 24 horas')}
      </tbody>
    </table>
  `)
}

function htmlAprobado(nombre: string): string {
  return htmlBase(`
    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">¡Bienvenido, ${nombre}!</p>
    <p style="margin:0 0 24px;font-size:15px;color:#6B7280;line-height:1.6;">Tu perfil ha sido aprobado. Ya eres parte de la comunidad Nómadas.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:8px;padding:0 16px;">
      <tbody>
        ${fila('Nombre', nombre)}
        ${fila('Estado', 'Aprobado')}
        ${fila('Siguiente paso', 'Tu perfil ya es visible para otros cofundadores')}
      </tbody>
    </table>
    <table cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr><td style="background:#111827;border-radius:6px;padding:12px 28px;">
        <a href="${PLATFORM_URL}/nomadas" style="color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Ver comunidad</a>
      </td></tr>
    </table>
  `)
}

function htmlRechazado(nombre: string, motivo?: string): string {
  return htmlBase(`
    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">Hola, ${nombre}</p>
    <p style="margin:0 0 24px;font-size:15px;color:#6B7280;line-height:1.6;">Luego de revisar tu registro, hemos tomado la siguiente decisión.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:8px;padding:0 16px;">
      <tbody>
        ${fila('Nombre', nombre)}
        ${fila('Estado', 'No aprobado')}
        ${motivo ? fila('Motivo', motivo) : ''}
      </tbody>
    </table>
    <p style="margin:28px 0 16px;font-size:14px;color:#6B7280;line-height:1.7;">Si consideras que hay un error, puedes responder directamente a este correo.</p>
    <table cellpadding="0" cellspacing="0">
      <tr><td style="background:#111827;border-radius:6px;padding:12px 28px;">
        <a href="mailto:nomadas.comunidad@gmail.com" style="color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Contactar equipo</a>
      </td></tr>
    </table>
  `)
}

function htmlCeoInvitacion(url: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB;">
        <tr><td style="background:#6366F1;padding:32px 40px;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">NÓMADAS</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">CEO Quiz</p>
          <p style="margin:0 0 24px;font-size:15px;color:#6B7280;line-height:1.6;">Estás invitado a participar en el CEO Quiz. Ingresa desde tu celular usando el siguiente enlace:</p>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="background:#6366F1;border-radius:999px;padding:14px 32px;">
              <a href="${url}" style="color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Unirme al juego</a>
            </td></tr>
          </table>
          <p style="margin:0;font-size:12px;color:#9CA3AF;word-break:break-all;">${url}</p>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #F3F4F6;">
          <p style="margin:0;font-size:12px;color:#9CA3AF;">© ${new Date().getFullYear()} Nómadas — Conectando cofundadores</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

const ASUNTOS: Record<TipoCorreo, string> = {
  registro:       'Tu registro en Nómadas está en revisión',
  aprobado:       '¡Tu perfil en Nómadas fue aprobado!',
  rechazado:      'Sobre tu registro en Nómadas',
  ceo_invitacion: 'Invitación al CEO Quiz — Nómadas',
}

async function enviar(to: string, subject: string, html: string): Promise<void> {
  const nodemailer = await import('npm:nodemailer')
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: Deno.env.get('GMAIL_USER')!,
      pass: Deno.env.get('GMAIL_APP_PASSWORD')!,
    },
  })
  await transport.sendMail({ from: FROM, to, subject, html })
}

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  let payload: CorreoPayload
  try {
    payload = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Body inválido' }), { status: 400, headers: corsHeaders })
  }

  const { tipo } = payload
  if (!tipo) {
    return new Response(JSON.stringify({ error: 'Falta tipo' }), { status: 400, headers: corsHeaders })
  }

  try {
    if (tipo === 'ceo_invitacion') {
      const { eventoId, url } = payload
      if (!eventoId || !url) {
        return new Response(JSON.stringify({ error: 'Faltan eventoId o url' }), { status: 400, headers: corsHeaders })
      }

      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      )

      const { data: asistencias } = await supabase
        .from('asistencias')
        .select('perfiles_datos(email, nombre)')
        .eq('evento_id', eventoId)

      if (asistencias) {
        await Promise.all(
          asistencias.map((a: any) => {
            const email = a.perfiles_datos?.email
            if (!email) return Promise.resolve()
            return enviar(email, ASUNTOS.ceo_invitacion, htmlCeoInvitacion(url))
          })
        )
      }
    } else {
      const { nombre, email, motivo } = payload
      if (!nombre || !email) {
        return new Response(JSON.stringify({ error: 'Faltan campos' }), { status: 400, headers: corsHeaders })
      }

      const htmlMap: Record<string, string> = {
        registro:  htmlRegistro(nombre),
        aprobado:  htmlAprobado(nombre),
        rechazado: htmlRechazado(nombre, motivo),
      }

      await enviar(email, ASUNTOS[tipo], htmlMap[tipo])
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error enviando correo', detail: String(err) }), {
      status: 500,
      headers: corsHeaders,
    })
  }

  return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
})
