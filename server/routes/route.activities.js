import express from 'express';

import verifyJWT from '../middleware/middleware.verifyJWT';

import { Activity } from '../models';

const router = express.Router();

router.post('/add', verifyJWT, async (req, res) => {
  // Get form data
  const { name, frequency } = req.body;

  // If name or password non-existent, return 400 error
  if (!name || !frequency) return res.status(400).end();

  // Save activity to database
  try {
    const activity = new Activity({ name, frequency, _userId: req.user._id });
    await activity.save();

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'could not create activity' }).end();
  }
});

export default router;
