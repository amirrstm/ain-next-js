const normalizeSrc = src => (src[0] === '/' ? src.slice(1) : src)

export default function cloudflareLoader({ src, width, quality }) {
  const params = [`w=${width}`, `q=${quality || 'auto'}`]
  return `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CLOUDFLARE_CLOUD_NAME}/${normalizeSrc(src)}/${params.join(',')}`
}
