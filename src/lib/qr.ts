interface BarcodeDetector {
  detect(source: HTMLImageElement): Promise<Array<{ rawValue: string }>>
}
declare const BarcodeDetector: {
  new(options: { formats: string[] }): BarcodeDetector
}

export async function decodificarQRDeImagen(file: File): Promise<string | null> {
  if (!('BarcodeDetector' in window)) return null

  const img = new Image()
  const url = URL.createObjectURL(file)
  img.src = url
  await new Promise((resolve) => { img.onload = resolve })
  URL.revokeObjectURL(url)

  const detector = new BarcodeDetector({ formats: ['qr_code'] })
  const results = await detector.detect(img)
  return results[0]?.rawValue ?? null
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
