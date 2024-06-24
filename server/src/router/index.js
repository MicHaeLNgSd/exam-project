const rootRouter = require('express').Router();

const checkToken = require('../middlewares/checkToken');
const contestRouter = require('./contestRouter');
const chatRouter = require('./chatRouter');
const userRouter = require('./userRouter');

rootRouter.use('/user', userRouter);
rootRouter.use(checkToken.checkToken);
rootRouter.use('/contests', contestRouter);
rootRouter.use('/chats', chatRouter);

module.exports = rootRouter;
