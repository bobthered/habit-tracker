import jwt from 'jsonwebtoken';

import { Activity } from '../../models';

const add = socket => {
  socket.on('add', async (data, token) => {
    try {
      // decode jwt
      const user = jwt.verify(token, process.env.JWT_KEY);

      // Update data with user._id
      data = JSON.parse(data);
      data._userId = user._id;

      // save new activity
      const activity = new Activity(data);
      await activity.save();

      socket.emit('add', { activity });
      console.log(activity);
    } catch (error) {
      console.log('socketio.activities.add.js', error);
    }
  });
};

export default add;
