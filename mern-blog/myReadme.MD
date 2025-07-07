MWANGI JOSPHAT KARANJA MERN WK 4 ASSIGNMENT - MERN BLOG

# MERN Blog Application

A full-stack blog application built with MongoDB, Express, React, and Node.js.

## Features
- User authentication (register/login)
- CRUD operations for blog posts
- Category management
- Responsive UI with React Router
- API communication with custom hooks
- Protected routes
- Error handling

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB

### Installation
1. Clone the repository:
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog

    Set up the server:

cd server
npm install
cp .env.example .env  

    Set up the client:

cd ../client
npm install
cp .env.example .env

    Start the development servers:

# In server directory
npm run dev

# In client directory
npm start

API Documentation
Authentication

    POST /api/users - Register user

    POST /api/users/login - Login user

Posts

    GET /api/posts - Get all posts

    GET /api/posts/:id - Get single post

    POST /api/posts - Create new post (protected)

    PUT /api/posts/:id - Update post (protected)

    DELETE /api/posts/:id - Delete post (protected)

Categories

    GET /api/categories - Get all categories

    POST /api/categories - Create new category (protected)

Advanced Features Implemented

    User authentication with JWT

    Protected routes

    Image uploads for post featured images

    Pagination for post lists

    Category filtering

Screenshots

 
 


This implementation provides:
1. Clear directory structure for client/server separation
2. MongoDB connection with Mongoose
3. Express server with RESTful API endpoints
4. React frontend with Vite
5. Proxy configuration for API calls
6. Environment variable management
7. CRUD operations for posts/categories
8. React components with routing
9. Custom hooks for API calls
10. Context API for state management
11. User authentication with protected routes
12. Comprehensive README with setup instructions

All code uses CommonJS modules for Node.js and ES modules for React. The solution implements all required tasks plus authentication as an advanced feature.

mern-blog/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Layout.jsx
│   │   │   ├── posts/
│   │   │   │   ├── PostList.jsx
│   │   │   │   ├── PostItem.jsx
│   │   │   │   ├── PostForm.jsx
│   │   │   │   └── PostDetail.jsx
│   │   │   └── categories/
│   │   │       └── CategorySelect.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── PostPage.jsx
│   │   │   ├── CreatePostPage.jsx
│   │   │   ├── EditPostPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── hooks/
│   │   │   ├── useApi.js
│   │   │   └── useAuth.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── vite.config.js
│   └── package.json
server/
├── config/
│   └── db.js
├── controllers/
│   ├── postController.js
│   ├── categoryController.js
│   └── authController.js
├── middleware/
│   ├── errorMiddleware.js
│   └── authMiddleware.js
├── models/
│   ├── Post.js
│   ├── Category.js
│   └── User.js
├── routes/
│   ├── postRoutes.js
│   ├── categoryRoutes.js
│   └── userRoutes.js
├── utils/
│   └── generateToken.js
├── .env
├── .env.example
├── server.js
└── package.json