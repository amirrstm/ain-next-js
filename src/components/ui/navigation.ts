import { createSharedPathnamesNavigation } from 'next-intl/navigation'

import { locales } from '../../i18n'

export const { Link, useRouter, usePathname, redirect } = createSharedPathnamesNavigation({ locales })
