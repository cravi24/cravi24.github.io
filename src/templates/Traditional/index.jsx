import './index.scss';

const Traditional = ({ resume }) => {
  const { personal, summary, experience, skills, education } = resume;
  return (
    <article className="TraditionalTemplate">
      <aside className="TraditionalTemplate__sidebar">
        <h1>{personal.name}</h1>
        <p className="TraditionalTemplate__headline">{personal.headline}</p>

        <section>
          <h2>Contact</h2>
          <p>{personal.email}</p>
          <p>{personal.phone}</p>
          <p>{personal.location}</p>
          <p>{personal.linkedin}</p>
          <p>{personal.github}</p>
        </section>

        <section>
          <h2>Skills</h2>
          <h3>Leadership</h3>
          <ul>{skills.leadership.map((s) => <li key={s}>{s}</li>)}</ul>
          <h3>Technical</h3>
          <ul>{skills.technical.map((s) => <li key={s}>{s}</li>)}</ul>
          <h3>Domains</h3>
          <ul>{skills.domains.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>

        <section>
          <h2>Education</h2>
          {education.map((e) => (
            <div key={e.school} className="TraditionalTemplate__edu">
              <strong>{e.degree}</strong>
              <p>{e.school}</p>
              <p>{e.year}</p>
            </div>
          ))}
        </section>
      </aside>

      <main className="TraditionalTemplate__main">
        <section>
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((job) => (
            <div key={`${job.company}-${job.start}`} className="TraditionalTemplate__job">
              <h3>{job.title}, {job.company}</h3>
              <p className="TraditionalTemplate__job-meta">{job.start} – {job.end} · {job.location}</p>
              <ul>{job.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
            </div>
          ))}
        </section>
      </main>
    </article>
  );
};

export default Traditional;
