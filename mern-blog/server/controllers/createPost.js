const createPost = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    // Basic validation
    if (!title || !content || !author || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify references exist
    const [userExists, categoryExists] = await Promise.all([
      User.exists({ _id: author }),
      Category.exists({ _id: category })
    ]);

    if (!userExists || !categoryExists) {
      return res.status(400).json({ 
        message: "Invalid references",
        details: {
          authorExists: !!userExists,
          categoryExists: !!categoryExists
        }
      });
    }

    const newPost = new Post({
      title,
      content,
      author,
      category,
      createdAt: new Date()
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ 
      message: "Failed to create post",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};