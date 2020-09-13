import login from './socketio.auth.login';
import signup from './socketio.auth.signup';
import verifyJWT from './socketio.auth.verifyJWT';

const authFunction = io => {
  const auth = io.of('/auth');
  auth.on('connection', socket => {
    login(socket);
    signup(socket);
    verifyJWT(socket);
  });
};

export default authFunction;
