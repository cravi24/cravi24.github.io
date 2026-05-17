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

const BerlinStartup = ({ resume }) => {
  const { personal, summary, experience, skills, education } = resume;
  const contactItems = [
    personal.location && { Icon: LocationIcon, text: personal.location },
    personal.email && { Icon: MailIcon, text: personal.email, href: `mailto:${personal.email}` },
    personal.phone && { Icon: PhoneIcon, text: personal.phone },
    personal.linkedin && {
      Icon: LinkedInIcon,
      text: linkedInHandle(personal.linkedin),
      printText: formatUrlForPrint(personal.linkedin),
      href: personal.linkedin,
    },
    personal.github && {
      Icon: GitHubIcon,
      text: githubHandle(personal.github),
      printText: formatUrlForPrint(personal.github),
      href: personal.github,
    },
  ].filter(Boolean);

  return (
    <article className="BerlinStartupTemplate">
      <header className="BerlinStartupTemplate__hero">
        <h1>{personal.name}</h1>
        <p className="BerlinStartupTemplate__headline">{personal.headline}</p>
        <div className="BerlinStartupTemplate__contact">
          {contactItems.map(({ Icon, text, printText, href }, i) => {
            const inner = (
              <>
                <Icon />
                {printText ? (
                  <>
                    <span className="screen-only">{text}</span>
                    <span className="print-only">{printText}</span>
                  </>
                ) : (
                  <span>{text}</span>
                )}
              </>
            );
            return href ? (
              <a
                key={i}
                className="BerlinStartupTemplate__contact-item"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            ) : (
              <span key={i} className="BerlinStartupTemplate__contact-item">{inner}</span>
            );
          })}
        </div>
      </header>

      <main className="BerlinStartupTemplate__body">
        <section>
          <h2>About</h2>
          <p>{summary}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((job, idx) => (
            <div key={`${job.company}-${job.start}-${idx}`} className="BerlinStartupTemplate__job">
              <h3>
                {job.title} <span className="BerlinStartupTemplate__job-sep">·</span>{' '}
                <em>{job.company}</em>
              </h3>
              <p className="BerlinStartupTemplate__job-meta">
                {job.start} – {job.end}
                {job.location && <span> · {job.location}</span>}
              </p>
              <ul>
                {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          {[
            ['Leadership', skills.leadership, false],
            ['Technical', skills.technical, false],
            ['Domains', skills.domains, true],
          ].filter(([, list]) => list && list.length).map(([label, list, alt]) => (
            <div key={label} className="BerlinStartupTemplate__skill-group">
              <h3>{label}</h3>
              <div className="BerlinStartupTemplate__chips">
                {list.map((s) => (
                  <span
                    key={s}
                    className={`BerlinStartupTemplate__chip ${alt ? 'BerlinStartupTemplate__chip--alt' : ''}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          <div className="BerlinStartupTemplate__edu-list">
            {education.map((e, i) => (
              <p key={i} className="BerlinStartupTemplate__edu">
                <strong>{e.degree}</strong>
                <span>, {e.school}</span>
                <span className="BerlinStartupTemplate__edu-year"> ({e.year})</span>
              </p>
            ))}
          </div>
        </section>
      </main>
    </article>
  );
};

export default BerlinStartup;
