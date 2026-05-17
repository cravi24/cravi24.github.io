/**
 * @typedef {Object} Resume
 * @property {Object} personal
 * @property {string} personal.name
 * @property {string} personal.headline
 * @property {string} personal.email
 * @property {string} personal.phone
 * @property {string} personal.location
 * @property {string} personal.linkedin
 * @property {string} personal.github
 * @property {string} summary
 * @property {Experience[]} experience
 * @property {{ leadership: string[], technical: string[], domains: string[] }} skills
 * @property {Education[]} education
 *
 * @typedef {Object} Experience
 * @property {string} company
 * @property {string} title
 * @property {string} start
 * @property {string} end
 * @property {string} location
 * @property {string[]} achievements
 *
 * @typedef {Object} Education
 * @property {string} school
 * @property {string} degree
 * @property {string} year
 */

/** @type {Resume} */
const dummyResume = {
  personal: {
    name: 'Ravi Chaudhary',
    headline: 'Engineering Manager · Berlin',
    email: '',
    phone: '',
    location: 'Berlin, Germany',
    linkedin: 'https://www.linkedin.com/in/ravi-chaudhary-0b18241b/',
    github: 'https://github.com/cravi24',
  },
  summary:
    'Engineering manager with 15+ years across senior IC and team-leadership roles in payments, developer productivity, and platform engineering. Currently at Babbel driving delivery on the next-generation payment platform on Stripe and migrating the static-site framework from Gatsby to Next.js, while running team ceremonies, hiring, and mentoring. Previously led a 4-engineer team at Expedia Group developing internal customer-service platforms that enabled travel agents to manage and resolve customer issues across hotel, flight, and car booking journeys. I care about process that fits the team\'s stage, velocity from removed friction, and pragmatic AI adoption that doesn\'t burn out the people doing the work.',
  experience: [
    {
      company: 'Babbel',
      title: 'Engineering Manager',
      start: 'Nov 2024',
      end: 'Present',
      location: 'Berlin, Germany',
      achievements: [
        'Lead the team owning Babbel\'s payment platform and core web framework; set the roadmap together with product partners.',
        'Run team ceremonies end-to-end (sprint planning, retros, refinements, demos) and own documentation hygiene for the services we operate.',
        'Lead hiring loops, run regular 1:1s and growth conversations, and partner with HR on performance reviews.',
        'Mentor mid-career and junior engineers; sponsor career growth and promotions.',
        'Drive cross-team alignment on architecture, dependencies, and rollout sequencing.',
      ],
    },
    {
      company: 'Babbel',
      title: 'Senior Fullstack Engineer',
      start: 'Nov 2020',
      end: 'Nov 2024',
      location: 'Berlin, Germany',
      achievements: [
        'Built and maintained services backing the Stripe-powered payment system; owned legacy critical paths (Refer-a-friend, pricing).',
        'Drove the migration of the static page-building framework from Gatsby to Next.js, unlocking SSR alongside static rendering.',
        'Architected and built the framework serving multiple high-traffic static pages — including Babbel\'s home page — on Gatsby + TypeScript.',
        'Partnered with growth on a campaigns app to track user landings across Babbel pages.',
      ],
    },
    {
      company: 'Expedia Inc.',
      title: 'Senior Software Engineer · Team Lead',
      start: 'Mar 2018',
      end: 'Nov 2020',
      location: 'Gurgaon, India',
      achievements: [
        'Led a 4-engineer team shipping NodeJS libraries adopted across the org: Twilio client SDK wrapper, Softphone abstraction, Kafka connector, IoT connector.',
        'Drove the rollout of event-driven architecture — migrated HTTP applications onto Kafka, socialized the design cross-team, and onboarded multiple downstream teams to the pattern.',
        'Designed and shipped a browser-connectivity solution making backend systems agent-state-aware, built on AWS IoT, Lambda, and Step Functions.',
        'Owned team capacity planning and partnered with recruiting on hiring loops; onboarded every new team member.',
      ],
    },
    {
      company: 'Adobe Systems',
      title: 'Software Engineer',
      start: '2010',
      end: '2013',
      location: 'Noida, India',
      achievements: [
        'Designed test cases and test plans across multiple product surfaces; executed manual and automation testing.',
        'Reviewed feature specifications and partnered with engineering teams on test strategy.',
        'Built utility tooling in multiple programming languages to enhance the team\'s automation framework.',
        'Owned defect reporting and tracking workflows end-to-end.',
      ],
    },
  ],
  skills: {
    leadership: [
      'Team building & hiring',
      'Mentoring & 1:1s',
      'Sprint ceremonies (planning, retros, refinements, demos)',
      'Cross-team architecture socialization',
      'Stakeholder communication',
      'Documentation & knowledge sharing',
    ],
    technical: [
      'JavaScript, TypeScript, Node.js, Java',
      'React, Next.js, Gatsby',
      'GraphQL, Redux, Webpack, Jest',
      'AWS (IoT, Lambda, Step Functions), Terraform',
      'Kafka, event-driven architecture',
      'HTML, CSS, Git',
    ],
    domains: [
      'Payments & subscriptions (Stripe)',
      'Static + SSR web frameworks',
      'Event-driven systems',
      'Developer tooling & infrastructure',
    ],
  },
  education: [
    { school: 'BITS Pilani', degree: 'M.Tech, Software Systems', year: '2012–2014' },
    { school: 'YMCAIE', degree: 'B.Tech, Information Technology', year: '2006–2010' },
  ],
};

export default dummyResume;
