import express from 'express';

import activities from './route.activities';
import auth from './route.auth';

const router = express.Router();

router.use('/activities', activities);
router.use('/auth', auth);

router.use('/', (req, res) => {
  res.render('index');
});

export default router;
