const WAYS_TO_USE = [
  {
    iconURL: `lightning.svg`,
    alt: 'lightning',
    header: 'Launch a Contest',
    text: 'Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.',
    btnText: 'Launch a Contest',
    btnLink: '/startContest',
  },
  {
    iconURL: `monitor.svg`,
    alt: 'monitor',
    header: 'Explore Names For Sale',
    text: 'Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design',
    btnText: 'Explore Names For Sale',
    btnLink: '#',
  },
  {
    iconURL: `lightbulb.svg`,
    alt: 'lightbulb',
    header: 'Agency-level Managed Contests',
    text: 'Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs',
    btnText: 'Learn More',
    btnLink: '#',
  },
];

const NAMING_CONTESTS_STEPS = [
  'Fill out your Naming Brief and begin receiving name ideas in minutes',
  'Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.',
  'Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.',
  'Pick a Winner. The winner gets paid for their submission.',
];

const FAQ_SECTIONS = [
  {
    header: 'Launching A Contest',
    questions: [
      {
        question: 'How long does it take to start receiving submissions?',
        answer:
          'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
      },
      {
        question: 'How long do Naming Contests last?',
        answer:
          'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).',
      },
    ],
  },
  {
    header: 'Buying From Marketplace',
    questions: [
      {
        question: "What's included with a Domain Purchase?",
        answer:
          'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you’re interested in validating your name.',
      },
      {
        question: 'How does the Domain transfer process work?',
        answer:
          'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.',
      },
    ],
  },
  {
    header: 'Managed Contests',
    questions: [
      {
        question: 'Where are the Branding Consultants located?',
        answer:
          'All our branding consultants are based in our Headquarters (Hoffman Estates, IL). They have years of experience managing branding projects for companies ranging from startups to Fortune 500 corporations.',
      },
    ],
  },
  {
    header: 'For Creatives',
    questions: [
      {
        question: 'Can I start participating immediately upon signing up?',
        answer:
          "When you initially signup, you are assigned few contests to assess your overall quality of submissions. Based upon the quality of your submissions, you will continue to be assigned additional contests. Once you have received enough high ratings on your submissions, your account will be upgraded to 'Full Access', so that you can begin participating in all open contests.",
      },
      {
        question: 'How Do I Get Paid?',
        answer:
          'We handle creative payouts via Paypal or Payoneer. Depending upon your country of residence, we may require additional documentation to verify your identity as well as your Tax status.',
      },
    ],
  },
];

const POPULAR_SEARCHES = [
  { name: 'Tech', url: '#' },
  { name: 'Clothing', url: '#' },
  { name: 'Finance', url: '#' },
  { name: 'Real Estate', url: '#' },
  { name: 'Crypto', url: '#' },
  { name: 'Short', url: '#' },
  { name: 'One Word', url: '#' },
];

export { WAYS_TO_USE, NAMING_CONTESTS_STEPS, FAQ_SECTIONS, POPULAR_SEARCHES };
