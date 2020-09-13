import auth from '../components/auth';
import serialize from 'form-serialize';

export default {
  addEventListeners: () => {
    document
      .querySelector('.page-signup form')
      .addEventListener('submit', async e => {
        e.preventDefault();
        await auth.signup(serialize(e.target, { hash: true }));
      });
  },
  elem: document.querySelector('.page-signup'),
};
