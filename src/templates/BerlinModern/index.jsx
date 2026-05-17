import './index.scss';

const BerlinModern = ({ resume }) => {
  const { personal, summary, experience, skills, education } = resume;
  const allSkills = [...skills.leadership, ...skills.technical, ...skills.domains];
  return (
    <article className="BerlinModernTemplate">
      <header>
        <h1>{personal.name}</h1>
        <p className="BerlinModernTemplate__headline">{personal.headline}</p>
        <p className="BerlinModernTemplate__meta">
          <span>{personal.location}</span>
          <span>·</span>
          <span>{personal.email}</span>
          <span>·</span>
          <span>{personal.phone}</span>
          <span>·</span>
          <span>{personal.linkedin}</span>
          <span>·</span>
          <span>{personal.github}</span>
        </p>
      </header>

      <section>
        <h2>Profile</h2>
        <p>{summary}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {experience.map((job) => (
          <div key={`${job.company}-${job.start}`} className="BerlinModernTemplate__job">
            <div className="BerlinModernTemplate__job-head">
              <strong>{job.title}</strong>
              <span className="BerlinModernTemplate__job-where">{job.company} · {job.location}</span>
              <span className="BerlinModernTemplate__job-when">{job.start}–{job.end}</span>
            </div>
            <ul>
              {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div className="BerlinModernTemplate__chips">
          {allSkills.map((s) => (
            <span key={s} className="BerlinModernTemplate__chip">{s}</span>
          ))}
        </div>
      </section>

      <section>
        <h2>Education</h2>
        {education.map((e) => (
          <p key={e.school}>
            <strong>{e.degree}</strong> · {e.school} · {e.year}
          </p>
        ))}
      </section>
    </article>
  );
};

export default BerlinModern;
