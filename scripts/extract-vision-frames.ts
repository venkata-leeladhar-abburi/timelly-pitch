import ffmpeg from 'fluent-ffmpeg'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

interface VideoConfig {
  input: string
  output: string
  fps: number
}

const videos: VideoConfig[] = [
  { input: '/Users/mac/Downloads/vision1.mp4', output: 'public/frames/vision1', fps: 24 },
  { input: '/Users/mac/Downloads/vision2.mp4', output: 'public/frames/vision2', fps: 24 },
  { input: '/Users/mac/Downloads/vision3.mp4', output: 'public/frames/vision3', fps: 24 },
]

async function convertToWebP(pngPath: string, webpPath: string): Promise<void> {
  await sharp(pngPath).webp({ quality: 85 }).toFile(webpPath)
  fs.unlinkSync(pngPath)
}

async function extractVideo({ input, output, fps }: VideoConfig): Promise<void> {
  fs.mkdirSync(output, { recursive: true })
  console.log(`⏳ Extracting ${input}...`)

  await new Promise<void>((resolve, reject) => {
    ffmpeg(input)
      .fps(fps)
      .outputOptions('-start_number 0')
      .output(path.join(output, 'frame_%04d.png'))
      .on('end', () => resolve())
      .on('error', reject)
      .run()
  })

  const files = fs.readdirSync(output).filter((f) => f.endsWith('.png'))
  console.log(`🖼  Converting ${files.length} frames to WebP...`)

  for (const file of files) {
    const pngPath = path.join(output, file)
    const webpPath = pngPath.replace('.png', '.webp')
    await convertToWebP(pngPath, webpPath)
  }

  const webpFiles = fs.readdirSync(output).filter((f) => f.endsWith('.webp'))
  fs.writeFileSync(
    path.join(output, 'meta.json'),
    JSON.stringify({
      totalFrames: webpFiles.length,
      path: `frames/${path.basename(output)}/`,
    })
  )
  console.log(`✓ ${input} → ${webpFiles.length} WebP frames saved`)
}

;(async () => {
  for (const video of videos) {
    await extractVideo(video)
  }
  console.log('✅ All vision frames extracted successfully.')
})()
