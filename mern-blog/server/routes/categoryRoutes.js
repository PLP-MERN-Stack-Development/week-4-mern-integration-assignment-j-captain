const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getCategories,
  createCategory
} = require('../controllers/categoryController');

router.route('/')
  .get(getCategories)
  .post(protect, admin, createCategory);

module.exports = router;