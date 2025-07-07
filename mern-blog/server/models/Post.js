// models/Post.js

const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  featuredImage: String,
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'posts' // Explicit collection name
});

module.exports = mongoose.model('Post', postSchema);