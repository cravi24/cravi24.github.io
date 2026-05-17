import { Link } from 'react-router-dom';
import AppRoutes from '../../constants/Routes';

const AboutMePage = () => (
  <div className="themed-page">
    <div className="themed-page__inner">
      <p className="themed-page__eyebrow">About</p>
      <h1>Hello.</h1>
      <p>
        I'm an engineering manager based in Berlin. I help teams ship faster, adopt AI without the drama, and pick the right process for the moment.
      </p>
      <p>
        For the long version — past roles, achievements, contact — see the <Link to={AppRoutes.ResumeBuilder}>resume page</Link>.
      </p>
    </div>
  </div>
);

export default AboutMePage;
