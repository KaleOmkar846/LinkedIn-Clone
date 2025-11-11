// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/users/register",
    LOGIN: "/api/users/login",
    LOGOUT: "/api/users/logout",
    ME: "/api/users/me",
  },
  POSTS: {
    BASE: "/api/posts",
    BY_ID: (id) => `/api/posts/${id}`,
  },
};

// Other constants
export const DATE_FORMAT = {
  SHORT: "short",
  LONG: "long",
};

export const MESSAGES = {
  SUCCESS: {
    POST_CREATED: "Post created successfully",
    POST_UPDATED: "Post updated successfully",
    POST_DELETED: "Post deleted successfully",
  },
  ERROR: {
    LOGIN_FAILED: "Login failed",
    SIGNUP_FAILED: "Signup failed",
    POST_CREATE_FAILED: "Failed to create post",
    POST_UPDATE_FAILED: "Failed to update post",
    POST_DELETE_FAILED: "Failed to delete post",
    POST_LOAD_FAILED: "Failed to load posts",
    NETWORK_ERROR: "Network error. Please try again.",
  },
};
