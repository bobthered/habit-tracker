import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

import { Activity, User } from '../models';

dotenv.config();
const router = express.Router();

router.post('/login', async (req, res) => {
  // Get credentials from JSON body
  const { email, password } = req.body;

  // If username or password non-existent, return 422 error
  if (!email || !password) return res.status(422).end();

  try {
    // Find email
    const user = await User.findOne({ email });
    if (user === null) return res.status(401).end();

    // Validate password
    const validPassword = await user.validatePassword(password);
    if (!validPassword) return res.status(401).end();

    delete user.password;

    // Create a new token
    const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
      algorithm: 'HS256',
      // expiresIn: process.env.JWT_EXPIRY_SECONDS,
    });

    // Return 200 status and json containing token
    res.status(200).json({ token }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'duplicate email' }).end();
  }
});

router.post('/signup', async (req, res) => {
  // Get credentials from JSON body
  const { email, password } = req.body;

  // If username or password non-existent, return 422 error
  if (!email || !password) return res.status(422).end();

  // Save user to database or return error if email already exists
  try {
    const user = new User(req.body);
    await user.save();
    delete user.password;

    // Create a new token
    const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
      algorithm: 'HS256',
    });

    // Return 200 status and json containing token
    res.status(200).json({ token }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'duplicate email' }).end();
  }
});

router.post('/verifyJWT', async (req, res) => {
  const io = req.app.get('io');
  try {
    // decode jwt
    console.log(req.body.token);
    const user = jwt.verify(req.body.token, process.env.JWT_KEY);
    console.log(user);
    const userActivities = await Activity.find({ _userId: user._id });
    console.log(userActivities);
    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'could not verify token' }).end();
  }
});

export default router;
