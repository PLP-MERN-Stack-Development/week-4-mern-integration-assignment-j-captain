const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware'); // If using authentication

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .post(createPost)
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);


  
module.exports = router;

