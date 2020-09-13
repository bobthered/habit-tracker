import socketio from '../components/socketio';

const pageElem = document.querySelector('.page-activities');
const templateElem = pageElem.querySelector('template#activity').content;
socketio.activities.on('add', data => {
  console.log(data);
});

export default {
  addEventListeners: () => {},
};
