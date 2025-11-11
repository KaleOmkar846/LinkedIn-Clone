import axiosInstance from '../config/axios';
import { API_ENDPOINTS } from '../constants';

/**
 * Posts API service
 */
const postsApi = {
  /**
   * Get all posts
   * @returns {Promise} Posts array
   */
  getAllPosts: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.POSTS.BASE);
    return response.data;
  },

  /**
   * Create a new post
   * @param {string} content - Post content
   * @returns {Promise} Created post
   */
  createPost: async (content) => {
    const response = await axiosInstance.post(API_ENDPOINTS.POSTS.BASE, {
      content,
    });
    return response.data;
  },

  /**
   * Update an existing post
   * @param {string} postId - Post ID
   * @param {string} content - Updated content
   * @returns {Promise} Updated post
   */
  updatePost: async (postId, content) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.POSTS.BY_ID(postId),
      { content }
    );
    return response.data;
  },

  /**
   * Delete a post
   * @param {string} postId - Post ID
   * @returns {Promise} Deletion response
   */
  deletePost: async (postId) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.POSTS.BY_ID(postId));
    return response.data;
  },
};

export default postsApi;
