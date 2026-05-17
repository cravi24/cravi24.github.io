import { Link } from 'react-router-dom';
import AppRoutes from '../../constants/Routes';

const AboutMePage = () => (
  <div className="themed-page">
    <div className="themed-page__inner">
      <p className="themed-page__eyebrow">About</p>
      <h1>Hello.</h1>
      <p>
        Engineering manager in Berlin with 15+ years across senior IC and team-leadership roles. Currently at Babbel — driving the next-generation payment platform on Stripe and the team's migration from Gatsby to Next.js, while running ceremonies, hiring, and mentoring.
      </p>
      <p>
        Before Babbel: led a 4-engineer team at Expedia Group developing internal customer-service platforms that enabled travel agents to manage and resolve customer issues across hotel, flight, and car booking journeys. Earlier years at Adobe building test automation tooling.
      </p>
      <p>
        Three things I care about: process that fits the team's stage, velocity from removing friction, and pragmatic AI adoption that doesn't burn out the people doing the work.
      </p>
      <p>
        Long version — full roles, projects, references — on the <Link to={AppRoutes.ResumeBuilder}>resume page</Link>.
      </p>
    </div>
  </div>
);

export default AboutMePage;
