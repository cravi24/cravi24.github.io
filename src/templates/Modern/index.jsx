import './index.scss';

const Modern = ({ resume }) => {
  const { personal, summary, experience, skills, education } = resume;
  return (
    <article className="ModernTemplate">
      <header className="ModernTemplate__header">
        <h1>{personal.name}</h1>
        <p className="ModernTemplate__headline">{personal.headline}</p>
        <p className="ModernTemplate__contact">
          {personal.email} · {personal.phone} · {personal.location}
          <br />
          {personal.linkedin} · {personal.github}
        </p>
      </header>

      <section className="ModernTemplate__section">
        <h2>Summary</h2>
        <p>{summary}</p>
      </section>

      <section className="ModernTemplate__section">
        <h2>Experience</h2>
        {experience.map((job) => (
          <div key={`${job.company}-${job.start}`} className="ModernTemplate__job">
            <div className="ModernTemplate__job-head">
              <span><strong>{job.title}</strong> · {job.company}</span>
              <span className="ModernTemplate__job-meta">{job.start} – {job.end} · {job.location}</span>
            </div>
            <ul>
              {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="ModernTemplate__section">
        <h2>Skills</h2>
        <p><strong>Leadership.</strong> {skills.leadership.join(' · ')}</p>
        <p><strong>Technical.</strong> {skills.technical.join(' · ')}</p>
        <p><strong>Domains.</strong> {skills.domains.join(' · ')}</p>
      </section>

      <section className="ModernTemplate__section">
        <h2>Education</h2>
        {education.map((e) => (
          <p key={e.school}>
            <strong>{e.degree}</strong> — {e.school}, {e.year}
          </p>
        ))}
      </section>
    </article>
  );
};

export default Modern;
