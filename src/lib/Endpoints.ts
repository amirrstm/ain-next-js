const ENDPOINTS = {
  USER: {
    LOGIN: '/public/user/generate-mobile-otp',
    VERIFY: '/auth/user/verify-mobile',
    UPDATE_NAME: '/user/user/update-name',

    GET_PROFILE: '/auth/user/profile',
    REFRESH_TOKEN: '/auth/user/refresh',
  },

  CATEGORY: {
    LIST: '/public/category/list',
    GET: (id: string) => `/public/category/get/${id}`,
  },
}

export default ENDPOINTS
