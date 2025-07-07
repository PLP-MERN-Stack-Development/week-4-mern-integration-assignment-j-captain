// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const postRoutes = require('./routes/posts');

// // Verify environment variables
// if (!process.env.MONGO_URI) {
//   console.error('ERROR: Missing MONGO_URI in .env file');
//   process.exit(1);
// }

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/posts', postRoutes);

// // Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//    .then(() => console.log('✅ Success!! Connected to MongoDB Compass'))
//    .catch(err => console.error('❌ Sorry!! MongoDB connection error:', err));
    
// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log();
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
//   console.log();
// });

// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
// const cors = require('cors');


// const postRoutes = require('./routes/postRoutes');
// const userRoutes = require('./routes/userRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');

// const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173' // Explicitly allow your frontend
// }));

// // Connect to database
// connectDB();

// // Middleware
// app.use(express.json());

// Routes
// app.use('/api/posts', require('./routes/postRoutes'));
// app.use('/api/categories', require('./routes/categoryRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

//Working version 2 

// Mount routes with '/api' prefix
// app.use('/api/posts', postRoutes);  // Now handles /api/posts
// app.use('/api/users', userRoutes);  // Handles /api/users
// app.use('/api/categories', categoryRoutes); // Handles /api/categories


// // Error handling middleware
// app.use(notFound);
// app.use(errorHandler);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log();
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
//   console.log();
// });

const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Explicitly allow your frontend
  credentials: true
}));
app.use(express.json());

// Mount routes with /api prefix
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Congratulation reaching this point.Its no small thing.Your API is working!" });
});

// Error handling middleware 

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mernBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
  socketTimeoutMS: 45000 // Keep sockets alive for 45s
})
.then(() => console.log('✅ Success!! Connected to MongoDB Compass'))
.catch(err => console.error('❌ Sorry!! MongoDB connection Error:', err));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log();
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log();
});