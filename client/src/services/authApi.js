import axiosInstance from '../config/axios';
import { API_ENDPOINTS } from '../constants';

/**
 * Authentication API service
 */
const authApi = {
  /**
   * Check current authentication status
   * @returns {Promise} User data
   */
  checkAuth: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Login response
   */
  login: async (email, password) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Register new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Registration response
   */
  signup: async (email, password) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Logout current user
   * @returns {Promise} Logout response
   */
  logout: async () => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
};

export default authApi;
