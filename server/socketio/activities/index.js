import add from './socketio.activities.add';

const activitiesFunction = io => {
  const activities = io.of('/activities');
  activities.on('connection', socket => {
    add(socket);
  });
};

export default activitiesFunction;
