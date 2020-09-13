import io from 'socket.io-client/dist/socket.io';

const socketio = {
  activities: io(`${window.location.host}/activities`),
  auth: io(`${window.location.host}/auth`),
};

export default socketio;
