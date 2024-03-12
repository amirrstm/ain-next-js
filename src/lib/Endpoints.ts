const ENDPOINTS = {
  USER: {
    LOGIN: '/public/user/generate-mobile-otp',
    VERIFY: '/auth/user/verify-mobile',
    UPDATE_NAME: '/user/user/update-name',

    PROMPT: '/user/user/prompt',
    GET_PROFILE: '/auth/user/profile',
    REFRESH_TOKEN: '/auth/user/refresh',
  },

  CATEGORY: {
    LIST: '/public/category/list',
    REQUEST: '/user/category-request',
    GET: (id: string) => `/public/category/get/${id}`,
  },

  CHAT: {
    GET: '/user/chat',
    DELETE: '/user/chat/delete',
    MESSAGE: '/user/chat/message',
  },

  DASHBOARD: {
    HISTORY: '/user/history/dashboard',
  },

  HISTORY: {
    GET: (page: number) => `/user/history/list?page=${page}`,
    FEEDBACK: (history: string) => `/user/history/feedback/${history}`,
  },
}

export default ENDPOINTS
