type Messages = typeof import('../../messages/fa/main.json') &
  typeof import('../../messages/fa/zod.json') &
  typeof import('../../messages/fa/form.json') &
  typeof import('../../messages/fa/constant.json')
declare interface IntlMessages extends Messages {}
