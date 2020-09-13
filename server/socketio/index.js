import socketIO from 'socket.io';

import activities from './activities';
import auth from './auth';

const socketio = server => {
  const io = socketIO(server);
  activities(io);
  auth(io);
};

export default socketio;
