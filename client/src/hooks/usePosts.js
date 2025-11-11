import { useState, useEffect } from 'react';
import postsApi from '../services/postsApi';

/**
 * Custom hook for managing posts
 * @param {number} refreshTrigger - Trigger to refresh posts
 * @returns {Object} Posts state and methods
 */
export const usePosts = (refreshTrigger = 0) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postsApi.getAllPosts();
      setPosts(data.posts);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content) => {
    try {
      await postsApi.createPost(content);
      await fetchPosts(); // Refresh posts after creation
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to create post',
      };
    }
  };

  const updatePost = async (postId, newContent) => {
    try {
      const response = await postsApi.updatePost(postId, newContent);
      setPosts(posts.map((post) => (post._id === postId ? response.post : post)));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to update post',
      };
    }
  };

  const deletePost = async (postId) => {
    try {
      await postsApi.deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to delete post',
      };
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};
