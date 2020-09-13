import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import lessMiddleware from 'less-middleware';
import loadConfigFile from 'rollup/dist/loadConfigFile';
import mongoose from 'mongoose';
import path from 'path';
import * as rollup from 'rollup';
import socketio from './socketio';

import router from './routes';

// Initiate dotenv
dotenv.config();

// MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.qz1pb.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
);

const app = express();
// const db = mongoose.connection;
const port = process.env.PORT || 5500;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views/routes'));

// Rollup Middleware
loadConfigFile(path.resolve(__dirname, '../rollup.config.js')).then(
  async ({ options, warnings }) => {
    warnings.flush();
    const bundle = await rollup.rollup(options[0]);
    await Promise.all(options[0].output.map(bundle.write));
    const watcher = rollup.watch(options[0]);
    watcher.on('event', event => {
      console.log(`Rollup - ${event.code}`);
      if (event.code === 'ERROR') console.log(event);
    });
  },
);

// Less Middleware
app.use(
  lessMiddleware(path.join(__dirname, '../public'), {
    debug: true,
    preprocess: {
      path: function (pathname) {
        return pathname.replace(/public/g, 'src').replace(/css/g, 'less');
      },
    },
    render: {
      javascriptEnabled: true,
    },
  }),
);

// Static Middleware
app.use('/', express.static(path.join(__dirname, '../public')));

// express.json middleware
app.use(express.json());

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// router
app.use('/', router);

// express server
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// socket.io
socketio(server);
