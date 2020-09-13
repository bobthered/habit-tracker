import socketio from '../components/socketio';

const add = (activity) => {
  console.log(activity);
  const activityElem = templateElem.cloneNode(true);
  activityElem.querySelector('.name').innerHTML = activity.name;
  activityListElem.appendChild(activityElem);
  sortList();
};
const sortList = () => {
  [...pageElem.querySelectorAll('.activity-list > *:not(template)')]
    .sort((a, b) =>
      a.querySelector('.name').innerHTML < b.querySelector('.name').innerHTML
        ? -1
        : 1
    )
    .forEach((activityElem) => activityListElem.appendChild(activityElem));
};

const pageElem = document.querySelector('.page-activities');
const activityListElem = pageElem.querySelector('.activity-list');
const templateElem = pageElem.querySelector('template#activity').content;
socketio.activities.on('add', (data) => add(data.activity));

export default {
  addEventListeners: () => {},
  add,
};
