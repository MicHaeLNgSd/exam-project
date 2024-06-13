const rootRouter = require('express').Router();
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const contestRouter = require('./contestRouter');
const chatRouter = require('./chatRouter');

rootRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);
rootRouter.post('/login', validators.validateLogin, userController.login);
rootRouter.post('/getUser', checkToken.checkAuth);

rootRouter.use(checkToken.checkToken);
rootRouter.use('/contests', contestRouter);
rootRouter.use('/chats', chatRouter);

rootRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

rootRouter.post('/dataForContest', contestController.dataForContest);
rootRouter.get('/downloadFile/:fileName', contestController.downloadFile);
rootRouter.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);
rootRouter.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

rootRouter.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);
rootRouter.post('/updateUser', upload.uploadAvatar, userController.updateUser);

rootRouter.get('/users/id/transactions', userController.getUserTransactions);

rootRouter.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

module.exports = rootRouter;
