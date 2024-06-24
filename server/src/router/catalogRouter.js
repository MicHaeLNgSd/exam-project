const catalogRouter = require('express').Router();
const chatController = require('../controllers/chatController');

catalogRouter
  .route('/')
  .post(chatController.createCatalog)
  .get(chatController.getCatalogs);

catalogRouter
  .route('/:catalogId')
  .put(chatController.updateNameCatalog)
  .delete(chatController.deleteCatalog);

//chats/catalogs/:catalogId/chat-items/:chatId
catalogRouter
  .route('/:catalogId/chat-items/:chatId')
  .post(chatController.addNewChatToCatalog)
  .delete(chatController.removeChatFromCatalog);

module.exports = catalogRouter;
