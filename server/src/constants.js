const path = require('path');
const env = process.env.NODE_ENV || 'development';

module.exports = {
  JWT_SECRET: 'asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4',
  ACCESS_TOKEN_TIME: 60 * 60,
  SALT_ROUNDS: 5,
  SQUADHELP_BANK: {
    NUMBER: '4564654564564564',
    NAME: 'SquadHelp',
    CVC: '453',
    EXPIRY: '11/26',
  },
  USER_ROLE: {
    CUSTOMER: 'customer',
    CREATOR: 'creator',
    MODERATOR: 'moderator',
  },
  CREATOR_ENTRIES: 'creator_entries',
  CONTEST_STATUS: {
    ACTIVE: 'active',
    FINISHED: 'finished',
    PENDING: 'pending',
  },
  CONTESTS_DEFAULT_DIR: 'public/contestFiles/',
  CONTEST_TYPE: {
    NAME: 'name',
    LOGO: 'logo',
    TAGLINE: 'tagline',
  },
  OFFER_STATUS: {
    REVIEWING: 'reviewing',
    DENIED: 'denied',
    PENDING: 'pending',
    REJECTED: 'rejected',
    WON: 'won',
  },
  DEV_FILES_PATH: path.resolve(__dirname, '..', 'public'),
  PROD_FILES_PATH: '/var/www/html',
  LOG_DIR: 'logs',
  LOG_TODAY_FILE: 'todaysLogs.log',
  SOCKET: {
    CONNECTION: 'connection',
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe',
  },
  NOTIFICATION: {
    ENTRY_CREATED: 'onEntryCreated',
    CHANGE_MARK: 'changeMark',
    CHANGE_OFFER_STATUS: 'changeOfferStatus',
  },
  NEW_MESSAGE: 'newMessage',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  TRANSACTION_TYPE: {
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE',
  },
  MAILER_EMAIL: {
    ADDRESS: 'testtestenko864@gmail.com',
    PASSWORD: 'qcfk nnyy csvf adwa',
  },
};
