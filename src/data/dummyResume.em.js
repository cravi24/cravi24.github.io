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
    name: 'Alex Morgan',
    headline: 'Engineering Manager · Platform & Developer Productivity',
    email: 'alex.morgan@example.com',
    phone: '+1 (415) 555-0142',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
  },
  summary:
    'Engineering Manager with 12 years building and leading high-performing teams in fintech and developer tooling. Combines deep technical foundations in distributed systems with people leadership: hiring, mentoring, performance, and roadmapping. Led platform org through 4× revenue growth at FinTech Co; reduced infra costs 30% while doubling deploy frequency.',
  experience: [
    {
      company: 'FinTech Co',
      title: 'Engineering Manager, Platform',
      start: '2022',
      end: 'Present',
      location: 'San Francisco, CA',
      achievements: [
        'Lead 8-engineer platform team responsible for CI/CD, observability, and developer experience tooling serving 120+ engineers.',
        'Drove platform consolidation reducing infra spend 30% YoY while doubling deploy frequency to 60+ per day.',
        'Hired 5 engineers across IC and senior IC levels; partnered with recruiting to halve time-to-offer.',
        'Owned platform OKRs end-to-end; co-authored quarterly engineering org roadmap with VP Eng.',
      ],
    },
    {
      company: 'PayCorp',
      title: 'Staff Software Engineer → Tech Lead',
      start: '2018',
      end: '2022',
      location: 'New York, NY',
      achievements: [
        'Tech-led 6-engineer team rebuilding the payments authorization service; cut p99 latency from 800ms → 120ms.',
        'Designed and shipped event-driven settlement pipeline processing $4B/year transaction volume.',
        'Mentored 4 engineers through promotion; established team\'s on-call rotation and incident review practice.',
      ],
    },
    {
      company: 'CloudStartup',
      title: 'Senior Software Engineer',
      start: '2014',
      end: '2018',
      location: 'Seattle, WA',
      achievements: [
        'Early engineer on container orchestration product; built scheduling subsystem from prototype to GA.',
        'Co-authored open-source SDK adopted by 200+ external teams.',
      ],
    },
  ],
  skills: {
    leadership: [
      'Hiring & team building',
      'Performance management',
      'Roadmap planning',
      'Cross-functional partnership',
      'Mentoring & career growth',
      'Org design',
    ],
    technical: [
      'Distributed systems',
      'Kubernetes & cloud platforms',
      'Observability (Prometheus, OpenTelemetry)',
      'Go, Python, TypeScript',
      'PostgreSQL, Kafka',
      'CI/CD architecture',
    ],
    domains: ['Fintech', 'Developer tooling', 'Platform engineering'],
  },
  education: [
    { school: 'Carnegie Mellon University', degree: 'M.S. Computer Science', year: '2014' },
    { school: 'University of Michigan', degree: 'B.S. Computer Engineering', year: '2012' },
  ],
};

export default dummyResume;
