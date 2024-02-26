import 'i18next'

import AuthNS from './locales/en/Auth.json'
import LayoutNS from './locales/en/Layout.json'
import MainNS from './locales/en/Main.json'
import MetaNs from './locales/en/Meta.json'
import UserNS from './locales/en/User.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      Auth: typeof AuthNS
      Main: typeof MainNS
      Meta: typeof MetaNs
      User: typeof UserNS
      Layout: typeof LayoutNS
    }
  }
}
