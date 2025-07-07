import { Router } from 'express';
const router = Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Router is working!' });
});

// Posts routes (example)
router.get('/posts', (req, res) => {
  res.json([{ id: 1, title: 'Sample Post' }]);
});

export default router;