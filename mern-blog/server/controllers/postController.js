const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    console.log('Attempting to fetch posts...');
    
    const posts = await Post.find()
      .populate({
        path: 'author',
        select: 'name email',
        model: 'User' // Explicit model reference
      })
      .populate({
        path: 'category',
        select: 'name',
        model: 'Category' // Explicit model reference
      })
      .lean(); // Convert to plain objects

    console.log(`Found ${posts.length} posts`);
    
    if (posts.length === 0) {
      console.warn('No posts found in database');
      // Verify collection name
      const collectionExists = await Post.db.collection('posts').countDocuments();
      console.log(`Posts collection exists: ${!!collectionExists}`);
      
      return res.status(200).json({ 
        message: "No posts found",
        debugInfo: {
          collectionExists: !!collectionExists,
          suggestion: "Use POST /api/posts to create new posts"
        }
      });
    }

    res.json(posts);
  } catch (err) {
    console.error('Post fetch error:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    
    res.status(500).json({ 
      message: "Database operation failed",
      error: process.env.NODE_ENV === 'development' ? {
        name: err.name,
        message: err.message,
        stack: err.stack
      } : undefined
    });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('category')
    .populate('author', 'name');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  res.status(200).json(post);
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, author } = req.body;

  // Basic validation
  if (!title || !content || !category || !author) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  // Create post
  const post = await Post.create({
    title,
    content,
    category,
    author: req.user.id // Assuming you're using auth middleware
  });

  res.status(201).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check if user owns the post
  if (post.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('category').populate('author', 'name');

  res.status(200).json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check if user owns the post
  if (post.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await post.remove();
  res.status(200).json({ success: true, message: 'Post removed' });
});



module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};