import { body } from 'express-validator';

export const createPostRules = [
  body('title').trim().isLength({ min: 5 }),
  body('content').trim().isLength({ min: 10 })
];