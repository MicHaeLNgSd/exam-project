const offerRouter = require('express').Router();

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
