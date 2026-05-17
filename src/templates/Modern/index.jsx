import {
  LinkedInIcon,
  GitHubIcon,
  MailIcon,
  PhoneIcon,
  LocationIcon,
  linkedInHandle,
  githubHandle,
  formatUrlForPrint,
} from '../../components/SocialIcons';
import './index.scss';

const skillGroups = (skills) =>
  [
    ['Leadership', skills.leadership],
    ['Technical', skills.technical],
    ['Domains', skills.domains],
  ].filter(([, list]) => list && list.length);

const Modern = ({ resume }) => {
  const { personal, summary, experience, skills, education } = resume;
  return (
    <article className="ModernTemplate">
      <header className="ModernTemplate__header">
        <h1 className="ModernTemplate__name">{personal.name}</h1>
        <p className="ModernTemplate__headline">{personal.headline}</p>
        <div className="ModernTemplate__contact">
          {personal.location && (
            <span className="ModernTemplate__contact-item">
              <LocationIcon />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.email && (
            <a className="ModernTemplate__contact-item" href={`mailto:${personal.email}`}>
              <MailIcon />
              <span>{personal.email}</span>
            </a>
          )}
          {personal.phone && (
            <span className="ModernTemplate__contact-item">
              <PhoneIcon />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.linkedin && (
            <a
              className="ModernTemplate__contact-item"
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              <span className="screen-only">{linkedInHandle(personal.linkedin)}</span>
              <span className="print-only">{formatUrlForPrint(personal.linkedin)}</span>
            </a>
          )}
          {personal.github && (
            <a
              className="ModernTemplate__contact-item"
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <span className="screen-only">{githubHandle(personal.github)}</span>
              <span className="print-only">{formatUrlForPrint(personal.github)}</span>
            </a>
          )}
        </div>
      </header>

      <section className="ModernTemplate__section">
        <h2>Summary</h2>
        <p className="ModernTemplate__summary">{summary}</p>
      </section>

      <section className="ModernTemplate__section">
        <h2>Experience</h2>
        {experience.map((job, idx) => (
          <article key={`${job.company}-${job.start}-${idx}`} className="ModernTemplate__job">
            <header className="ModernTemplate__job-head">
              <div className="ModernTemplate__job-titles">
                <strong className="ModernTemplate__job-title">{job.title}</strong>
                <span className="ModernTemplate__job-company">{job.company}</span>
              </div>
              <div className="ModernTemplate__job-meta">
                <span>{job.start} – {job.end}</span>
                {job.location && <span className="ModernTemplate__job-location">{job.location}</span>}
              </div>
            </header>
            <ul className="ModernTemplate__job-bullets">
              {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="ModernTemplate__section">
        <h2>Skills</h2>
        <div className="ModernTemplate__skills">
          {skillGroups(skills).map(([label, list]) => (
            <div key={label} className="ModernTemplate__skill-group">
              <h3>{label}</h3>
              <div className="ModernTemplate__chips">
                {list.map((s) => <span key={s} className="ModernTemplate__chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ModernTemplate__section">
        <h2>Education</h2>
        <div className="ModernTemplate__education">
          {education.map((e, i) => (
            <div key={i} className="ModernTemplate__edu-item">
              <div>
                <strong>{e.degree}</strong>
                <span className="ModernTemplate__edu-school"> · {e.school}</span>
              </div>
              <span className="ModernTemplate__edu-year">{e.year}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default Modern;
