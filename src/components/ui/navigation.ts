import { createSharedPathnamesNavigation } from 'next-intl/navigation'

const locales = ['fa'] as const
export const { Link, useRouter, usePathname, redirect } = createSharedPathnamesNavigation({ locales })
