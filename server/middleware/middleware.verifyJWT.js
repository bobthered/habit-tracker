import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();
const router = express.Router();

router.use(async (req, res, next) => {
  // Check if token exits
  if (!req.body.token)
    return res.status(400).json({ message: 'missing token' }).end();

  try {
    // decode jwt
    req.user = jwt.verify(req.body.token, process.env.JWT_KEY);
    delete req.user.password;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'could not verify token' }).end();
  }
});

export default router;
