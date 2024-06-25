const offerRouter = require('express').Router();
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');

offerRouter
  .route('/')
  .post(
    upload.uploadLogoFiles,
    basicMiddlewares.canSendOffer,
    contestController.setNewOffer
  )
  .put(
    basicMiddlewares.onlyForCustomerWhoCreateContest,
    contestController.setOfferStatus
  );

module.exports = offerRouter;
