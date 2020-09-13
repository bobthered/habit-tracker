import jwt from 'jsonwebtoken';

import { Activity, User } from '../../models';

const login = socket => {
  socket.on('login', async credentials => {
    // Get credentials
    const { email, password } = credentials;

    // If username or password non-existent
    if (!email || !password)
      socket.emit('errorHandler', {
        message: 'Incomplete credentials.  Please try again.',
      });

    try {
      // Find email
      const user = await User.findOne({ email });
      if (user === null)
        return socket.emit('errorHandler', {
          message: 'Could not verify credentials.  Please try again.',
        });

      // Validate password
      const validPassword = await user.validatePassword(password);
      if (!validPassword)
        return socket.emit('errorHandler', {
          message: 'Could not verify credentials.  Please try again.',
        });

      // Create a new jwt
      const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
        algorithm: 'HS256',
      });

      // Get activities
      const activities = await Activity.find({ _userId: user._id });

      socket.emit('login', { token, activities });
    } catch (error) {
      console.log(error);
      socket.emit('errorHandler', {
        message: `Email "${email}" already exists.`,
      });
    }
  });
};

export default login;
