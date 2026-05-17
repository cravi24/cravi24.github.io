import './index.scss';

const BerlinStartup = ({ resume }) => {
  const { personal, summary, experience, skills, education } = resume;
  return (
    <article className="BerlinStartupTemplate">
      <header className="BerlinStartupTemplate__hero">
        <h1>{personal.name}</h1>
        <p className="BerlinStartupTemplate__headline">{personal.headline}</p>
        <div className="BerlinStartupTemplate__contact">
          <span>{personal.location}</span>
          <span>{personal.email}</span>
          <span>{personal.linkedin}</span>
          <span>{personal.github}</span>
        </div>
      </header>

      <main className="BerlinStartupTemplate__body">
        <section>
          <h2>About</h2>
          <p>{summary}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((job) => (
            <div key={`${job.company}-${job.start}`} className="BerlinStartupTemplate__job">
              <h3>
                {job.title} <span>·</span> <em>{job.company}</em>
              </h3>
              <p className="BerlinStartupTemplate__job-meta">
                {job.start} – {job.end} · {job.location}
              </p>
              <ul>
                {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          <div className="BerlinStartupTemplate__skill-group">
            <h3>Leadership</h3>
            <div className="BerlinStartupTemplate__chips">
              {skills.leadership.map((s) => (
                <span key={s} className="BerlinStartupTemplate__chip">{s}</span>
              ))}
            </div>
          </div>
          <div className="BerlinStartupTemplate__skill-group">
            <h3>Technical</h3>
            <div className="BerlinStartupTemplate__chips">
              {skills.technical.map((s) => (
                <span key={s} className="BerlinStartupTemplate__chip">{s}</span>
              ))}
            </div>
          </div>
          <div className="BerlinStartupTemplate__skill-group">
            <h3>Domains</h3>
            <div className="BerlinStartupTemplate__chips">
              {skills.domains.map((s) => (
                <span key={s} className="BerlinStartupTemplate__chip BerlinStartupTemplate__chip--alt">{s}</span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2>Education</h2>
          {education.map((e) => (
            <p key={e.school}>
              <strong>{e.degree}</strong>, {e.school} ({e.year})
            </p>
          ))}
        </section>
      </main>
    </article>
  );
};

export default BerlinStartup;
