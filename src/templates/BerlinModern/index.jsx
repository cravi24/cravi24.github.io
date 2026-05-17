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

const BerlinModern = ({ resume }) => {
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
    <article className="BerlinModernTemplate">
      <header className="BerlinModernTemplate__header">
        <h1>{personal.name}</h1>
        <p className="BerlinModernTemplate__headline">{personal.headline}</p>
        <div className="BerlinModernTemplate__meta">
          {contactItems.map(({ Icon, text, printText, href }, i) => {
            const className = 'BerlinModernTemplate__meta-item';
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
              <a key={i} className={className} href={href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <span key={i} className={className}>{inner}</span>
            );
          })}
        </div>
      </header>

      <section className="BerlinModernTemplate__section">
        <h2>Profile</h2>
        <p>{summary}</p>
      </section>

      <section className="BerlinModernTemplate__section">
        <h2>Experience</h2>
        {experience.map((job, idx) => (
          <div key={`${job.company}-${job.start}-${idx}`} className="BerlinModernTemplate__job">
            <div className="BerlinModernTemplate__job-head">
              <strong className="BerlinModernTemplate__job-title">{job.title}</strong>
              <span className="BerlinModernTemplate__job-where">
                {job.company}{job.location ? ` · ${job.location}` : ''}
              </span>
              <span className="BerlinModernTemplate__job-when">{job.start}–{job.end}</span>
            </div>
            <ul>
              {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="BerlinModernTemplate__section">
        <h2>Skills</h2>
        <div className="BerlinModernTemplate__skill-rows">
          {skillGroups(skills).map(([label, list]) => (
            <div key={label} className="BerlinModernTemplate__skill-row">
              <span className="BerlinModernTemplate__skill-label">{label}</span>
              <div className="BerlinModernTemplate__chips">
                {list.map((s) => <span key={s} className="BerlinModernTemplate__chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="BerlinModernTemplate__section">
        <h2>Education</h2>
        <div className="BerlinModernTemplate__edu-list">
          {education.map((e, i) => (
            <p key={i} className="BerlinModernTemplate__edu">
              <strong>{e.degree}</strong>
              <span className="BerlinModernTemplate__edu-school"> · {e.school}</span>
              <span className="BerlinModernTemplate__edu-year">{e.year}</span>
            </p>
          ))}
        </div>
      </section>
    </article>
  );
};

export default BerlinModern;
