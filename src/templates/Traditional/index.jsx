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

const Traditional = ({ resume }) => {
  const { personal, summary, experience, skills, education } = resume;
  return (
    <article className="TraditionalTemplate">
      <aside className="TraditionalTemplate__sidebar">
        <header className="TraditionalTemplate__header">
          <h1 className="TraditionalTemplate__name">{personal.name}</h1>
          <p className="TraditionalTemplate__headline">{personal.headline}</p>
        </header>

        <section className="TraditionalTemplate__sidebar-section">
          <h2>Contact</h2>
          <ul className="TraditionalTemplate__contact-list">
            {personal.location && (
              <li>
                <LocationIcon /> <span>{personal.location}</span>
              </li>
            )}
            {personal.email && (
              <li>
                <MailIcon /> <a href={`mailto:${personal.email}`}>{personal.email}</a>
              </li>
            )}
            {personal.phone && (
              <li>
                <PhoneIcon /> <span>{personal.phone}</span>
              </li>
            )}
            {personal.linkedin && (
              <li>
                <LinkedInIcon />{' '}
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">{linkedInHandle(personal.linkedin)}</span>
                  <span className="print-only">{formatUrlForPrint(personal.linkedin)}</span>
                </a>
              </li>
            )}
            {personal.github && (
              <li>
                <GitHubIcon />{' '}
                <a href={personal.github} target="_blank" rel="noopener noreferrer">
                  <span className="screen-only">{githubHandle(personal.github)}</span>
                  <span className="print-only">{formatUrlForPrint(personal.github)}</span>
                </a>
              </li>
            )}
          </ul>
        </section>

        <section className="TraditionalTemplate__sidebar-section">
          <h2>Skills</h2>
          {skillGroups(skills).map(([label, list]) => (
            <div key={label} className="TraditionalTemplate__skill-group">
              <h3>{label}</h3>
              <ul>{list.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          ))}
        </section>

        <section className="TraditionalTemplate__sidebar-section">
          <h2>Education</h2>
          {education.map((e, i) => (
            <div key={i} className="TraditionalTemplate__edu">
              <strong>{e.degree}</strong>
              <p>{e.school}</p>
              <p className="TraditionalTemplate__edu-year">{e.year}</p>
            </div>
          ))}
        </section>
      </aside>

      <main className="TraditionalTemplate__main">
        <section className="TraditionalTemplate__main-section">
          <h2>Summary</h2>
          <p className="TraditionalTemplate__summary">{summary}</p>
        </section>

        <section className="TraditionalTemplate__main-section">
          <h2>Experience</h2>
          {experience.map((job, idx) => (
            <article key={`${job.company}-${job.start}-${idx}`} className="TraditionalTemplate__job">
              <header className="TraditionalTemplate__job-head">
                <h3>{job.title}</h3>
                <p className="TraditionalTemplate__job-company">{job.company}</p>
                <p className="TraditionalTemplate__job-meta">
                  {job.start} – {job.end}
                  {job.location && <span> · {job.location}</span>}
                </p>
              </header>
              <ul className="TraditionalTemplate__job-bullets">
                {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </article>
  );
};

export default Traditional;
