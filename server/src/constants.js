const path = require('path');
const env = process.env.NODE_ENV || 'development';

module.exports = {
  JWT_SECRET: 'asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4',
  ACCESS_TOKEN_TIME: 60 * 60,
  SALT_ROUNDS: 5,
  SQUADHELP_BANK_NUMBER: '4564654564564564',
  SQUADHELP_BANK_NAME: 'SquadHelp',
  SQUADHELP_BANK_CVC: '453',
  SQUADHELP_BANK_EXPIRY: '11/26',
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  MODERATOR: 'moderator',
  CREATOR_ENTRIES: 'creator_entries',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  CONTESTS_DEFAULT_DIR: 'public/contestFiles/',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_REVIEWING: 'reviewing',
  OFFER_STATUS_DENIED: 'denied',
  OFFER_STATUS_PENDING: 'pending',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  DEV_FILES_PATH: path.resolve(__dirname, '..', 'public'),
  PROD_FILES_PATH: '/var/www/html',
  LOG_DIR: 'logs',
  LOG_TODAY_FILE: 'todaysLogs.log',
  SOCKET_CONNECTION: 'connection',
  SOCKET_SUBSCRIBE: 'subscribe',
  SOCKET_UNSUBSCRIBE: 'unsubscribe',
  NOTIFICATION_ENTRY_CREATED: 'onEntryCreated',
  NOTIFICATION_CHANGE_MARK: 'changeMark',
  NOTIFICATION_CHANGE_OFFER_STATUS: 'changeOfferStatus',
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
