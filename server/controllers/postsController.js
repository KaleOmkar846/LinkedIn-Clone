import Post from '../models/Post.js';
import { postSchema } from '../validators/postValidator.js';

/**
 * Create a new post
 * @route POST /api/posts
 */
export const createPost = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { content } = value;

    // Create new post
    const newPost = new Post({
      content,
      author: req.user._id,
    });

    await newPost.save();

    // Populate author information before sending response
    await newPost.populate('author', 'email');

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all posts
 * @route GET /api/posts
 */
export const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts, sorted by createdAt descending (newest first)
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'email');

    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update a post
 * @route PUT /api/posts/:id
 */
export const updatePost = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { content } = value;

    // Find the post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You can only edit your own posts' });
    }

    // Update the post
    post.content = content;
    await post.save();

    // Populate author information before sending response
    await post.populate('author', 'email');

    res.json({
      message: 'Post updated successfully',
      post: post,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a post
 * @route DELETE /api/posts/:id
 */
export const deletePost = async (req, res) => {
  try {
    // Find the post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You can only delete your own posts' });
    }

    // Delete the post
    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
