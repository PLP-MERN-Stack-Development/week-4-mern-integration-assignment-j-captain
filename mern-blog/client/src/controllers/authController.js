// controllers/authController.js
export const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });
  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true }).status(201).json(user);
};

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true }).json(user);
};

// middleware/authMiddleware.js
export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};