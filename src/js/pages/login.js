import auth from '../components/auth';
import serialize from 'form-serialize';

export default {
  addEventListeners: () => {
    document.querySelector('.page-login form').addEventListener('submit', e => {
      e.preventDefault();
      auth.login(serialize(e.target, { hash: true }));
    });
  },
  elem: document.querySelector('.page-login'),
};
