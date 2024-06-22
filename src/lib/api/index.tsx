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
    LIST_PAIN: '/public/category/plain-list',
    REQUEST: '/user/category-request',
    GET: (id: string) => `/public/category/get/${id}`,
  },

  TONE: {
    LIST: '/public/data/tones',
  },

  CHAT: {
    GET: '/user/chat',
    DELETE: '/user/chat/delete',
    MESSAGE: '/user/chat/message',
  },

  IMAGE: {
    GENERATE: '/user/user/image-prompt',
  },

  DASHBOARD: {
    HISTORY: '/user/history/dashboard',
  },

  DATA: {
    SKILLS: '/public/data/skills',
    COMPANIES: '/public/data/companies',
    PROVINCES: '/public/data/provinces',
    OCCUPATIONS: '/public/data/occupations',
    UNIVERSITIES: '/public/data/universities',
    STUDY_FIELDS: '/public/data/study-fields',
  },

  HISTORY: {
    GET: (page: number) => `/user/history/list?page=${page}`,
    FEEDBACK: (history: string) => `/user/history/feedback/${history}`,
  },

  RESUME: {
    POST: '/user/resume',
    GET_ALL: '/user/resume/list',
    GET_TEMPLATES: '/public/template',
    CREATE_FROM_VOICE: '/user/resume/voice',
    CREATE_FROM_OCCUPATION: '/user/resume/occupation',

    DELETE: (id: string) => `/user/resume/${id}`,
    GET_ONE: (id: string) => `/user/resume/${id}`,
    UPDATE_TITLE: (id: string) => `/user/resume/${id}/title`,
    UPDATE_DOWNLOAD: (id: string) => `/user/resume/${id}/update`,
    UPLOAD_VOICE: (id: string) => `/user/resume/${id}/bio-voice`,
    GET_SETTINGS: (id: string) => `/user/resume/${id}/settings`,
    UPDATE_TEMPLATE: (id: string) => `/user/resume/${id}/template`,

    AI_BIO_CREATE: (id: string) => `/user/resume/${id}/bio-ai`,
    AI_HIGHLIGHT_CREATE: (id: string) => `/user/resume/${id}/highlight-ai`,

    UPLOAD_IMAGE: (id: string) => `/user/resume/${id}/upload-image`,
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
