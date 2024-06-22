const chatRouter = require('express').Router();
const chatController = require('../controllers/chatController');
const catalogRouter = require('./catalogRouter');

chatRouter.get('/', chatController.getChat);
chatRouter.get('/preview', chatController.getPreview);
chatRouter.post('/newMessage', chatController.addMessage);
chatRouter.post('/blackList', chatController.blackList);
chatRouter.post('/favorite', chatController.favoriteChat);

chatRouter.use('/catalogs', catalogRouter);

module.exports = chatRouter;
