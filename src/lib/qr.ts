import { BrowserQRCodeReader } from '@zxing/browser'

interface BarcodeDetectorAPI {
  detect(source: HTMLImageElement): Promise<Array<{ rawValue: string }>>
}
declare const BarcodeDetector: {
  new(options: { formats: string[] }): BarcodeDetectorAPI
}

async function cargarImagen(file: File): Promise<HTMLImageElement> {
  const img = new Image()
  const url = URL.createObjectURL(file)
  img.src = url
  await new Promise((resolve) => { img.onload = resolve })
  URL.revokeObjectURL(url)
  return img
}

export async function decodificarQRDeImagen(file: File): Promise<string | null> {
  const img = await cargarImagen(file)

  if ('BarcodeDetector' in window) {
    try {
      const detector = new BarcodeDetector({ formats: ['qr_code'] })
      const results = await detector.detect(img)
      if (results[0]?.rawValue) return results[0].rawValue
    } catch {}
  }

  try {
    const reader = new BrowserQRCodeReader()
    const result = await reader.decodeFromImageElement(img)
    return result.getText()
  } catch {}

  return null
}

export function buildMatchUrl(codigo: string) {
  return `https://somosnomadas.vercel.app/match/${codigo}`
}

export function descargarQRComoPNG(svgContainer: HTMLElement, nombre: string) {
  const svg = svgContainer.querySelector('svg')
  if (!svg) return

  const serializer = new XMLSerializer()
  const svgStr = serializer.serializeToString(svg)
  const blob = new Blob([svgStr], { type: 'image/svg+xml' })
  const svgUrl = URL.createObjectURL(blob)

  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 400
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, 400, 400)
    ctx.drawImage(img, 0, 0, 400, 400)
    URL.revokeObjectURL(svgUrl)

    const a = document.createElement('a')
    a.download = `qr-${nombre.replace(/\s+/g, '-').toLowerCase()}.png`
    a.href = canvas.toDataURL('image/png')
    a.click()
  }

  img.src = svgUrl
}
