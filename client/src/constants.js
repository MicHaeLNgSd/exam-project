const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 5000;
const CONSTANTS = {
  COMPANY_CONTACTS: { TEL_NUMBER: '(877) 355-3585' },
  USER_ROLE: {
    CUSTOMER: 'customer',
    CREATOR: 'creator',
    MODERATOR: 'moderator',
  },
  CONTEST_STATUS: {
    ACTIVE: 'active',
    FINISHED: 'finished',
    PENDING: 'pending',
  },
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

  STATIC_IMAGES_PATH: '/staticImages/',
  ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: 'accessToken',
  publicImagesURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/public/images/`,
  publicContestsURL:
    env === 'production'
      ? `http://${serverIP}:80/contests/`
      : `http://${serverIP}:${serverPort}/public/contests/`,

  CHAT_MODE: {
    NORMAL_PREVIEW: 'NORMAL_PREVIEW_CHAT_MODE',
    FAVORITE_PREVIEW: 'FAVORITE_PREVIEW_CHAT_MODE',
    BLOCKED_PREVIEW: 'BLOCKED_PREVIEW_CHAT_MODE',
    CATALOG_PREVIEW: 'CATALOG_PREVIEW_CHAT_MODE',
  },

  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
  CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
  USER_INFO_MODE: 'USER_INFO_MODE',
  CASHOUT_MODE: 'CASHOUT_MODE',
  AUTH_MODE: {
    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN',
  },

  HEADER_ANIMATION_TEXT: [
    'a Company',
    'a Brand',
    'a Website',
    'a Service',
    'a Book',
    'a Business',
    'an App',
    'a Product',
    'a Startup',
  ],
  FOOTER_ITEMS: [
    {
      title: 'SQUADHELP',
      items: ['About', 'Contact', 'How It Works?', 'Testimonials', 'Our Work'],
    },
    {
      title: 'RESOURCES',
      items: [
        'How It Works',
        'Become a Creative',
        'Business Name Generator',
        'Discussion Forum',
        'Blog',
        'Download eBook',
        'Pricing',
        'Help & FAQs',
      ],
    },
    {
      title: 'OUR SERVICES',
      items: [
        'Naming',
        'Logo Design',
        'Taglines',
        'Premium Names For Sale',
        'Creative Owned Names For Sale',
        'Audience Testing',
        'Trademark Research & Filling',
        'Managed Agency Service',
      ],
    },
    {
      title: 'LEGAL',
      items: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
    },
  ],
};

export default CONSTANTS;
