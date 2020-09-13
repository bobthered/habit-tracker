import auth from '../components/auth';
import serialize from 'form-serialize';
import socketio from '../components/socketio';
import { transition } from '../components/page';

const clearForm = () => {
  document.querySelector('.page-add form [name="name"]').value = '';
  document.querySelector('.page-add form [name="frequency"]').checked = false;
};

export default {
  addEventListeners: () => {
    document
      .querySelector('.page-add form')
      .addEventListener('submit', async e => {
        e.preventDefault();
        socketio.activities.emit(
          'add',
          JSON.stringify(serialize(e.target, { hash: true })),
          auth.getToken(),
        );
        clearForm();
        transition('out-modal', 'add');
      });
  },
  elem: document.querySelector('.page-add'),
};
