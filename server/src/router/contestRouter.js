const contestRouter = require('express').Router();
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');

contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

//take id from tokent
contestRouter.get('/customers', contestController.getCustomersContests); // '/'

contestRouter
  .route('/:contestId')
  .get(basicMiddlewares.canGetContest, contestController.getContestById)
  .put(upload.updateContestFile, contestController.updateContest);

//=========================

contestRouter.post('/data', contestController.dataForContest);
contestRouter.get('/files/:fileName', contestController.downloadFile);

module.exports = contestRouter;
