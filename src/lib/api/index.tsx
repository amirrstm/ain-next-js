const API = {
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

  DATA: {
    PROVINCES: '/public/data/provinces',
    OCCUPATIONS: '/public/data/occupations',
  },

  HISTORY: {
    GET: (page: number) => `/user/history/list?page=${page}`,
    FEEDBACK: (history: string) => `/user/history/feedback/${history}`,
  },

  RESUME: {
    POST: '/user/resume',
    GET_ALL: '/user/resume/list',
    GET_ONE: (id: string) => `/user/resume/${id}`,
    UPLOAD_VOICE: (id: string) => `/user/resume/${id}/bio-voice`,

    AI_BIO_CREATE: (id: string) => `/user/resume/${id}/bio-ai`,

    BASIC: (id: string) => `/user/resume/${id}/basic`,
    EDUCATION: (id: string) => `/user/resume/${id}/education`,
    WORK: (id: string) => `/user/resume/${id}/work`,
    SKILL: (id: string) => `/user/resume/${id}/skill`,
    PROJECT: (id: string) => `/user/resume/${id}/project`,
    LANGUAGE: (id: string) => `/user/resume/${id}/language`,
    CERTIFICATE: (id: string) => `/user/resume/${id}/certificate`,
    PROFILE: (id: string) => `/user/resume/${id}/profile`,
    PUBLICATION: (id: string) => `/user/resume/${id}/publication`,
    INVENTION: (id: string) => `/user/resume/${id}/invention`,
    INTEREST: (id: string) => `/user/resume/${id}/interest`,
    AWARD: (id: string) => `/user/resume/${id}/award`,
    REFERENCE: (id: string) => `/user/resume/${id}/reference`,
    SPEECH: (id: string) => `/user/resume/${id}/speech`,
    TEACHING: (id: string) => `/user/resume/${id}/teaching`,
    VOLUNTEER: (id: string) => `/user/resume/${id}/volunteer`,
  },
}

export default API
