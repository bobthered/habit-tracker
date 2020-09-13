import jwt from 'jsonwebtoken';

import { User } from '../../models';

const signup = socket => {
  socket.on('signup', async credentials => {
    // Get credentials
    const { email, password } = credentials;

    // If username or password non-existent
    if (!email || !password)
      return socket.emit('errorHandler', {
        message: 'Incomplete credentials.  Please try again.',
      });

    // Create user
    try {
      const user = new User(credentials);
      await user.save();

      // Create a new jwt
      const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
        algorithm: 'HS256',
      });

      socket.emit('login', { token });
    } catch (error) {
      console.log(error.message);
      if (error.code === 11000)
        return socket.emit('errorHandler', {
          message: `Email "${error.keyValue.email}" already exists.  Please try again.`,
        });
    }
  });
};

export default signup;
