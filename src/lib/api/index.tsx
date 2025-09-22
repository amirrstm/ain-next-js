const API = {
  CATEGORY: {
    GET: (id: string) => `/public/category/get/${id}`,
    LIST: '/public/category/list',
    LIST_PAIN: '/public/category/plain-list',
    REQUEST: '/user/category-request'
  },

  CHAT: {
    DELETE: '/user/chat/delete',
    GET: '/user/chat',
    MESSAGE: '/user/chat/message'
  },

  DASHBOARD: {
    HISTORY: '/user/history/dashboard'
  },

  DATA: {
    COMPANIES: '/public/data/companies',
    OCCUPATIONS: '/public/data/occupations',
    PROVINCES: '/public/data/provinces',
    SKILLS: '/public/data/skills',
    STUDY_FIELDS: '/public/data/study-fields',
    UNIVERSITIES: '/public/data/universities'
  },

  HISTORY: {
    FEEDBACK: (history: string) => `/user/history/feedback/${history}`,
    GET: (page: number) => `/user/history/list?page=${page}`
  },

  IMAGE: {
    GENERATE: '/user/user/image-prompt'
  },

  RESUME: {
    AI_BIO_CREATE: (id: string) => `/user/resume/${id}/bio-ai`,
    AI_HIGHLIGHT_CREATE: (id: string) => `/user/resume/${id}/highlight-ai`,
    AWARD: (id: string) => `/user/resume/${id}/award`,
    BASIC: (id: string) => `/user/resume/${id}/basic`,
    CERTIFICATE: (id: string) => `/user/resume/${id}/certificate`,
    CREATE_FROM_OCCUPATION: '/user/resume/occupation',
    CREATE_FROM_VOICE: '/user/resume/voice',

    DELETE: (id: string) => `/user/resume/${id}`,
    EDUCATION: (id: string) => `/user/resume/${id}/education`,
    GET_ALL: '/user/resume/list',
    GET_ONE: (id: string) => `/user/resume/${id}`,
    GET_SETTINGS: (id: string) => `/user/resume/${id}/settings`,
    GET_TEMPLATES: '/public/template',
    INTEREST: (id: string) => `/user/resume/${id}/interest`,
    INVENTION: (id: string) => `/user/resume/${id}/invention`,
    LANGUAGE: (id: string) => `/user/resume/${id}/language`,
    POST: '/user/resume',
    PROFILE: (id: string) => `/user/resume/${id}/profile`,
    PROJECT: (id: string) => `/user/resume/${id}/project`,
    PUBLICATION: (id: string) => `/user/resume/${id}/publication`,
    REFERENCE: (id: string) => `/user/resume/${id}/reference`,
    SKILL: (id: string) => `/user/resume/${id}/skill`,
    SPEECH: (id: string) => `/user/resume/${id}/speech`,
    TEACHING: (id: string) => `/user/resume/${id}/teaching`,
    UPDATE_DOWNLOAD: (id: string) => `/user/resume/${id}/update`,
    UPDATE_TEMPLATE: (id: string) => `/user/resume/${id}/template`,
    UPDATE_TITLE: (id: string) => `/user/resume/${id}/title`,

    UPLOAD_IMAGE: (id: string) => `/user/resume/${id}/upload-image`,
    UPLOAD_VOICE: (id: string) => `/user/resume/${id}/bio-voice`,
    VOLUNTEER: (id: string) => `/user/resume/${id}/volunteer`,
    WORK: (id: string) => `/user/resume/${id}/work`
  },

  TONE: {
    LIST: '/public/data/tones'
  },
  USER: {
    GET_PROFILE: '/auth/user/profile',
    LOGIN: '/public/user/generate-mobile-otp',

    PROMPT: '/user/user/prompt',
    REFRESH_TOKEN: '/auth/user/refresh',
    UPDATE_NAME: '/user/user/update-name',
    VERIFY: '/auth/user/verify-mobile'
  }
}

export default API
