import 'i18next'

import AuthNS from './locales/en/Auth.json'
import LayoutNS from './locales/en/Layout.json'
import MainNS from './locales/en/Main.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      Auth: typeof AuthNS
      Main: typeof MainNS
      Layout: typeof LayoutNS
    }
  }
}
