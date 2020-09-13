import activities from '../pages/activities';
import * as error from './error';
import socketio from './socketio';
import { transition } from './page';

const getToken = () => localStorage.getItem('token');
const login = async (credentials) => socketio.auth.emit('login', credentials);
const setToken = (token) => localStorage.setItem('token', token);
const signup = async (credentials) => socketio.auth.emit('signup', credentials);

socketio.auth.on('errorHandler', (data) => error.show(data.message));
socketio.auth.on('login', (data) => {
  setToken(data.token);
  data.activities.forEach(activities.add);
  transition('out-bottom', 'login');
  transition('in-bottom', 'activities');
  transition('in-bottom', 'navigation');
});
socketio.auth.on('signup', (data) => {
  setToken(data.token);
  transition('out-bottom', 'signup');
  transition('in-bottom', 'activities');
  transition('in-bottom', 'navigation');
});
socketio.auth.on('verifyJWT', (data) => {
  transition('out-bottom', 'splash');
  if ('error' in data) return transition('in-bottom', 'login');
  setToken(data.token);
  data.activities.forEach(activities.add);
  transition('in-bottom', 'activities');
  transition('in-bottom', 'navigation');
});

const verifyJWT = async () => socketio.auth.emit('verifyJWT', getToken());

const auth = {
  getToken,
  login,
  setToken,
  signup,
  verifyJWT,
};
export default auth;
