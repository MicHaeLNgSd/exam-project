const userRouter = require('express').Router();

const userController = require('../controllers/userController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');

userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  userController.registration
);
userRouter.post('/login', validators.validateLogin, userController.login);
userRouter.post('/getUser', checkToken.checkAuth);

userRouter.use(checkToken.checkToken);

userRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

userRouter.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);
userRouter.post('/updateUser', upload.uploadAvatar, userController.updateUser);

userRouter.get('/id/transactions', userController.getUserTransactions);

userRouter.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

module.exports = userRouter;
