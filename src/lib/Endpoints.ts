const ENDPOINTS = {
  GET_CONFIG: '/configs/data',
  COUNTRY: { GET_ALL: '/countries' },
  LANGUAGES: { GET_ALL: '/languages' },
  PARTNERS: { GET_ALL: '/shop/partners' },
  SHIPPING_METHOD: { GET_ALL: '/shipping-methods' },
  SHIPPING_PROFILE: { GET_ALL: '/shipping-profiles' },
  COUPON: { SET_COUPON: '/coupons/set', GET_ONE: (id: number) => `/coupons/${id}` },
  LEAD_QUESTIONS: { GET_ALL: '/shop/leading-questions', ANSWER: 'shop/leading-answers' },

  USER_ORDER: {
    BASKET: '/basket/bulk-add',
    CHECKOUT: '/order-sales/basket',
    SHARE: '/basket/send-to-other-user',
    PENDING: '/basket/user/show-pending',

    ACTIVATE: '/basket/active',
    DECLINE: '/basket/user/remove-items',
  },

  PRODUCTS: {
    COMMENTS: '/comments',
    GET_ALL_VARIATIONS: '/shop/product-variations/list',
    GET_PRODUCT_VARIATIONS: (id: string) => `/shop/product-variations/product/${id}`,
  },

  PRODUCT_CATEGORY: {
    GET_ALL: '/product-categories',
    GET_TREE: '/product-categories/tree',
  },

  TICKET: {
    GET_ALL: '/tickets',
    CREATE_ONE: '/tickets',
    TICKET_MESSAGES: `/ticket-comments`,
    GET_ONE: (id: number) => `/tickets/${id}`,
    GET_TICKET_MESSAGE: (id: number) => `/ticket-comments/${id}`,
  },

  PARTY: {
    GET_ALL: '/shop/parties',
    GET_ONE: (id: number) => `/shop/parties/${id}`,
    CREATE_SHOP: '/shop/parties/guest',

    GUESTS: '/party-guests',
    CREATE_GUEST: '/shop/party-guests',
    ONE_GUEST: (id: number) => `/party-guests/${id}`,

    ACTIVATE: (id: number) => `/parties/${id}/active`,
    ACCEPTANCE: (id: number) => `/parties/${id}/accept`,

    BASKET: '/basket/bulk-add',
    CHECKOUT: '/order-sales/basket',
    FINISHED: (id: number) => `/parties/${id}/finished`,
  },

  PAYMENT_METHODS: {
    GET_ALL: '/payment-methods',
    GET_ONE: (id: number) => `/payment-methods/${id}`,
  },

  LEGALS: {
    GET_ONE: (name: string) => `/legals/${name}`,
    GET_ALL: (name: string) => `/legals/index/${name}`,
  },

  USER: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    EDIT: '/users/profile/edit',
    GET_PROFILE: '/users/profile',
    TWO_FACTOR: 'two-factor/verify',
    SET_SPONSOR: '/users/set-sponsor',
    RESET_PASSWORD: '/reset-password',
    RESEND_EMAIL: '/email/verify/resend',
    ASSIGN_LEGALS: '/users/assign-legals',
    CHANGE_PASSWORD: '/reset-password/change-password',
    GET_UNASSIGNED_LEGALS: '/users/unassigned-own-legals',

    SET_TWO_FACTOR: '/users/profile/enable-two-factor-authentication',

    FAVORITES: '/users/favorites',
    DOCUMENTS: '/users/profile/documents',
    GET_PARTNER_USERS: 'partners/users-of-first-level',

    NEWSLETTER_SUBSCRIBE: '/subscribe',
    NEWSLETTER_UNSUBSCRIBE: '/unsubscribe',

    GOOGLE_REDIRECT: '/google/auth/redirect?redirect_url="solutionsapps.shop"',
    MICROSOFT_REDIRECT: '/microsoft/auth/redirect?redirect_url="solutionsapps.shop"',

    GOOGLE_CALLBACK: '/google/auth/callback?redirect_url="solutionsapps.shop"',
    MICROSOFT_CALLBACK: '/microsoft/auth/callback?redirect_url="solutionsapps.shop"',

    CONTACT_GROUPS: {
      POST: '/contact-groups',
      GET_ALL: '/contact-groups',
      GET_ONE: (id: number) => `/contact-groups/${id}`,
      SET_INVOICE: '/users/profile/change-invoice-contact-group',
    },
  },

  PASSWORD: {
    RESET: '/reset-password',
    CHANGE: `/users/profile/change-password`,
  },

  ORDER: {
    ORDER_SALE: {
      GET_ALL: '/order-sales/list',
      GET_ONE: (orderId: string) => `/order-sale/${orderId}`,
      GENERATE_PAYMENT_LINK: (orderId: number) => `/order/sales/${orderId}/generate-payment-link`,
    },
  },

  WEBSITE_SETTING: {
    ANALYTIC: '/settings/analytic-tags',
    SALE_SYSTEM: '/settings/sale-system',
    EXPORT_CUSTOM: '/settings/export-custom',
    SOCIAL_MEDIA: '/settings/social-media',

    LOGO: '/settings/logo',
    THEME: '/settings/theme',
    FAVICON: '/settings/favicon',
    SHOP_LOGO: '/settings/shop-logo',
    TITLE: '/settings/website-title',
    PARTNER: '/settings/partner',
  },

  WIDGET: {
    CREATE: '/widgets',
    GET_ONE: (id: number) => `/widgets/${id}`,
    GET_BY_SLUG: (slug: string) => `/widgets/${slug}`,

    CREATE_FILES: '/widget-files',
    GET_ONE_FILE: (id: number) => `/widget-files/${id}`,
  },
}

export default ENDPOINTS
