import io from 'socket.io-client/dist/socket.io';

const socketio = {
  activities: io('http://localhost:5500/activities'),
  auth: io('http://localhost:5500/auth'),
};

export default socketio;
