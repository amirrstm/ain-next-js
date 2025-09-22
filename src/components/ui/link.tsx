import NextLink, { type LinkProps } from 'next/link'

export default function Link({
  lng,
  href,
  children,
  className,
  prefetch = false,
  ...rest
}: LinkProps & { lng: string; children: React.ReactNode; className?: string }) {
  return (
    <NextLink {...rest} className={className} href={`/${lng}${href}`} prefetch={prefetch}>
      {children}
    </NextLink>
  )
}
