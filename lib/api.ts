export const API_BASE_URL = "https://api.samraattrader.com";

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/api/auth/register`,
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    me: `${API_BASE_URL}/api/auth/me`,
    forgotPassword: `${API_BASE_URL}/api/auth/forgot-password`,
    resetPassword: (token: string) => `${API_BASE_URL}/api/auth/reset/${token}`,
    order: `${API_BASE_URL}/api/auth/order`,
    validate: `${API_BASE_URL}/api/auth/validate`,
  },
  contact: `${API_BASE_URL}/api/contact`,
  consultation: `${API_BASE_URL}/api/consulte`,
}
