import express from 'express';
import { isLoggedIn } from '../middleware/auth.js';
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controllers/postsController.js';

const router = express.Router();

// POST /api/posts (Create Post) - Protected Route
router.post('/', isLoggedIn, createPost);

// GET /api/posts (Read All Posts) - Public Route
router.get('/', getAllPosts);

// PUT /api/posts/:id (Update Post) - Protected Route
router.put('/:id', isLoggedIn, updatePost);

// DELETE /api/posts/:id (Delete Post) - Protected Route
router.delete('/:id', isLoggedIn, deletePost);

export default router;
