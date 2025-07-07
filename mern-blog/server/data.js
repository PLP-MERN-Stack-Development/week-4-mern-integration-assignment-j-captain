const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mernBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function insertFullData() {
  try {
    // ===== 1. Insert Categories =====
    const categories = await Category.insertMany([
      { name: "Technology" },
      { name: "Programming" },
      { name: "Web Development" },
      { name: "Mobile Development" },
      { name: "Data Science" },
      { name: "Artificial Intelligence" },
      { name: "Cybersecurity" },
      { name: "Cloud Computing" },
      { name: "DevOps" },
      { name: "UI/UX Design" },
      { name: "Blockchain" },
      { name: "Game Development" },
      { name: "Machine Learning" },
      { name: "Internet of Things (IoT)" },
      { name: "Software Engineering" }
    ]);
    console.log(`Inserted ${categories.length} categories`);

    // ===== 2. Insert Users =====
    const usersData = [
      { name: "Admin User", email: "admin@example.com", password: "admin123", isAdmin: true },
      { name: "John Doe", email: "john@example.com", password: "john123" },
      { name: "Jane Smith", email: "jane@example.com", password: "jane123" },
      { name: "Alex Johnson", email: "alex@example.com", password: "alex123" },
      { name: "Emily Davis", email: "emily@example.com", password: "emily123" },
      { name: "Michael Brown", email: "michael@example.com", password: "michael123" },
      { name: "Sarah Wilson", email: "sarah@example.com", password: "sarah123" },
      { name: "David Lee", email: "david@example.com", password: "david123" },
      { name: "Lisa Taylor", email: "lisa@example.com", password: "lisa123" },
      { name: "James Miller", email: "james@example.com", password: "james123" }
    ];

    const users = await Promise.all(usersData.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return await User.create({ ...user, password: hashedPassword });
    }));
    console.log(`Inserted ${users.length} users`);

    // ===== 3. Insert Posts =====
    const posts = await Post.insertMany([
      {
        title: "Getting Started with React",
        content: "React is a JavaScript library for building user interfaces. Learn the core concepts like components, state, and props in this beginner's guide.",
        category: categories[0]._id,
        author: users[0]._id,
        featuredImage: "https://example.com/react.jpg"
      },
      {
        title: "Node.js Best Practices",
        content: "Explore the best practices for Node.js development including error handling, project structure, and performance optimization.",
        category: categories[1]._id,
        author: users[1]._id,
        featuredImage: "https://example.com/nodejs.jpg"
      },
      {
        title: "MongoDB Aggregation Framework",
        content: "Master complex data analysis with MongoDB's powerful aggregation pipeline operators like $match, $group, and $project.",
        category: categories[2]._id,
        author: users[2]._id,
        featuredImage: "https://example.com/mongodb.jpg"
      },
      {
        title: "CSS Grid Layout Guide",
        content: "Create modern responsive layouts with CSS Grid. Learn grid-template-areas, fr units, and gap properties for perfect alignment.",
        category: categories[3]._id,
        author: users[3]._id,
        featuredImage: "https://example.com/css-grid.jpg"
      },
      {
        title: "Authentication with JWT",
        content: "Implement secure authentication in your apps using JSON Web Tokens. Includes refresh token strategy and security considerations.",
        category: categories[4]._id,
        author: users[4]._id,
        featuredImage: "https://example.com/jwt.jpg"
      },
      {
        title: "Docker for Developers",
        content: "Containerize your applications with Docker. Learn Dockerfiles, volumes, networks, and Docker Compose for development environments.",
        category: categories[5]._id,
        author: users[5]._id,
        featuredImage: "https://example.com/docker.jpg"
      },
      {
        title: "Python for Data Science",
        content: "Use Python with Pandas and NumPy for data analysis. Covers data cleaning, visualization, and basic machine learning concepts.",
        category: categories[6]._id,
        author: users[6]._id,
        featuredImage: "https://example.com/python.jpg"
      },
      {
        title: "GraphQL vs REST",
        content: "Compare GraphQL and REST APIs. Understand when to use each approach with practical examples of querying and mutating data.",
        category: categories[7]._id,
        author: users[7]._id,
        featuredImage: "https://example.com/graphql.jpg"
      },
      {
        title: "AWS Lambda Tutorial",
        content: "Build serverless applications with AWS Lambda. Learn about triggers, cold starts, and integrating with other AWS services.",
        category: categories[8]._id,
        author: users[8]._id,
        featuredImage: "https://example.com/aws.jpg"
      },
      {
        title: "Responsive Web Design",
        content: "Essential techniques for responsive design including media queries, flexible grids, and responsive images for all devices.",
        category: categories[9]._id,
        author: users[9]._id,
        featuredImage: "https://example.com/responsive.jpg"
      },
      {
        title: "TypeScript for JavaScript Devs",
        content: "Transition from JavaScript to TypeScript. Learn about interfaces, types, generics, and how they improve code quality.",
        category: categories[10]._id,
        author: users[0]._id,
        featuredImage: "https://example.com/typescript.jpg"
      },
      {
        title: "CI/CD with GitHub Actions",
        content: "Automate your deployment pipeline with GitHub Actions. Create workflows for testing, building, and deploying your applications.",
        category: categories[11]._id,
        author: users[1]._id,
        featuredImage: "https://example.com/github.jpg"
      },
      {
        title: "Flask vs Django",
        content: "Compare Flask and Django for Python web development. Understand when to choose microframework vs batteries-included approach.",
        category: categories[12]._id,
        author: users[2]._id,
        featuredImage: "https://example.com/flask.jpg"
      },
      {
        title: "Web Security Best Practices",
        content: "Essential security practices for web developers including HTTPS, CSP, XSS prevention, and secure authentication methods.",
        category: categories[13]._id,
        author: users[3]._id,
        featuredImage: "https://example.com/security.jpg"
      },
      {
        title: "Next.js for Full-Stack Apps",
        content: "Build full-stack applications with Next.js. Learn about API routes, static generation, server-side rendering, and deployment.",
        category: categories[14]._id,
        author: users[4]._id,
        featuredImage: "https://example.com/nextjs.jpg"
      }
    ]);
    console.log(`Inserted ${posts.length} posts`);

    console.log('✅ All data inserted successfully!');
    console.log(`📝 Posts: ${posts.length}`);
    console.log(`👥 Users: ${users.length}`);
    console.log(`🏷️ Categories: ${categories.length}`);
  } catch (error) {
    console.error('❌ Error inserting data:', error);
  } finally {
    mongoose.disconnect();
  }
}

insertFullData();