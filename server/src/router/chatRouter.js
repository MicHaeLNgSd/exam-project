const chatRouter = require('express').Router();
const chatController = require('../controllers/chatController');

chatRouter.get('/', chatController.getChat);
chatRouter.get('/preview', chatController.getPreview);
chatRouter.post('/newMessage', chatController.addMessage);
chatRouter.post('/blackList', chatController.blackList);
chatRouter.post('/favorite', chatController.favoriteChat);

chatRouter.post('/createCatalog', chatController.createCatalog);
chatRouter.post('/deleteCatalog', chatController.deleteCatalog);
chatRouter.post('/updateNameCatalog', chatController.updateNameCatalog);
chatRouter.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);
chatRouter.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);
chatRouter.post('/getCatalogs', chatController.getCatalogs);

module.exports = chatRouter;
