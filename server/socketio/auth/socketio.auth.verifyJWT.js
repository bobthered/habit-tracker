import jwt from 'jsonwebtoken';

import { Activity } from '../../models';

const verifyJWT = socket => {
  socket.on('verifyJWT', async token => {
    try {
      // decode jwt
      const user = jwt.verify(token, process.env.JWT_KEY);

      // Get activities
      const activities = await Activity.find({ _userId: user._id });

      socket.emit('verifyJWT', { activities, token });
    } catch (error) {
      socket.emit('verifyJWT', { error: error.message });
    }
  });
};

export default verifyJWT;
