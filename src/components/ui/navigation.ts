import { createNavigation } from 'next-intl/navigation'

import { locales } from '../../i18n/routing'

export const { Link, useRouter, usePathname, redirect } = createNavigation({ locales })
