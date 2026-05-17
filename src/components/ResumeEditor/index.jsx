import { useState } from 'react';
import './index.scss';

function Section({ title, isDummy, children }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="ResumeEditor__section">
      <button
        type="button"
        className="ResumeEditor__section-head"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        {isDummy && <span className="ResumeEditor__badge">dummy</span>}
        <span className="ResumeEditor__chevron">{open ? '▾' : '▸'}</span>
      </button>
      {open && <div className="ResumeEditor__section-body">{children}</div>}
    </section>
  );
}

const PERSONAL_FIELDS = ['name', 'headline', 'email', 'phone', 'location', 'linkedin', 'github'];
const SKILL_GROUPS = ['leadership', 'technical', 'domains'];
const EMPTY_JOB = { company: '', title: '', start: '', end: '', location: '', achievements: [''] };

function jobSummary(job) {
  const t = (job.title || '').trim();
  const c = (job.company || '').trim();
  if (!t && !c) return '(empty)';
  if (t && c) return `${t} @ ${c}`;
  return t || c;
}

export default function ResumeEditor({ user, setUser, isDummy, reset }) {
  const updatePersonal = (field, value) =>
    setUser({ ...user, personal: { ...user.personal, [field]: value } });

  const updateSkills = (group, csv) =>
    setUser({
      ...user,
      skills: {
        ...user.skills,
        [group]: csv.split(',').map((s) => s.trim()).filter(Boolean),
      },
    });

  const updateEduItem = (idx, field, value) => {
    const next = [...(user.education || [])];
    next[idx] = { ...next[idx], [field]: value };
    setUser({ ...user, education: next });
  };

  const addEdu = () =>
    setUser({
      ...user,
      education: [...(user.education || []), { school: '', degree: '', year: '' }],
    });

  const removeEdu = (idx) => {
    const next = [...(user.education || [])];
    next.splice(idx, 1);
    setUser({ ...user, education: next });
  };

  const updateJob = (jobIdx, field, value) => {
    const next = [...(user.experience || [])];
    next[jobIdx] = { ...next[jobIdx], [field]: value };
    setUser({ ...user, experience: next });
  };

  const toggleJob = (jobIdx) => {
    const next = [...(user.experience || [])];
    next[jobIdx] = { ...next[jobIdx], _open: !next[jobIdx]._open };
    setUser({ ...user, experience: next });
  };

  const moveJob = (jobIdx, delta) => {
    const next = [...(user.experience || [])];
    const targetIdx = jobIdx + delta;
    if (targetIdx < 0 || targetIdx >= next.length) return;
    [next[jobIdx], next[targetIdx]] = [next[targetIdx], next[jobIdx]];
    setUser({ ...user, experience: next });
  };

  const duplicateJob = (jobIdx) => {
    const next = [...(user.experience || [])];
    const copy = JSON.parse(JSON.stringify(next[jobIdx]));
    copy._open = true;
    next.splice(jobIdx + 1, 0, copy);
    setUser({ ...user, experience: next });
  };

  const updateAchievement = (jobIdx, achIdx, value) => {
    const next = [...(user.experience || [])];
    const achievements = [...(next[jobIdx]?.achievements || [])];
    achievements[achIdx] = value;
    next[jobIdx] = { ...next[jobIdx], achievements };
    setUser({ ...user, experience: next });
  };

  const addAchievement = (jobIdx) => {
    const next = [...(user.experience || [])];
    const achievements = [...(next[jobIdx]?.achievements || []), ''];
    next[jobIdx] = { ...next[jobIdx], achievements };
    setUser({ ...user, experience: next });
  };

  const removeAchievement = (jobIdx, achIdx) => {
    const next = [...(user.experience || [])];
    const achievements = [...(next[jobIdx]?.achievements || [])];
    achievements.splice(achIdx, 1);
    next[jobIdx] = { ...next[jobIdx], achievements };
    setUser({ ...user, experience: next });
  };

  const addJob = () =>
    setUser({
      ...user,
      experience: [...(user.experience || []), { ...EMPTY_JOB, _open: true }],
    });

  const removeJob = (jobIdx) => {
    const next = [...(user.experience || [])];
    next.splice(jobIdx, 1);
    setUser({ ...user, experience: next });
  };

  const experience = user.experience || [];

  return (
    <aside className="ResumeEditor">
      <h2>Edit your resume</h2>
      <p className="ResumeEditor__hint">
        Empty sections show dummy data. Clear all fields in a section to revert it.
      </p>

      <Section title="Personal" isDummy={isDummy('personal')}>
        {PERSONAL_FIELDS.map((f) => (
          <label key={f}>
            <span>{f}</span>
            <input
              type="text"
              value={user.personal?.[f] || ''}
              onChange={(e) => updatePersonal(f, e.target.value)}
            />
          </label>
        ))}
      </Section>

      <Section title="Summary" isDummy={isDummy('summary')}>
        <label>
          <span>Summary paragraph</span>
          <textarea
            rows={6}
            value={user.summary || ''}
            onChange={(e) => setUser({ ...user, summary: e.target.value })}
          />
        </label>
      </Section>

      <Section title="Experience" isDummy={isDummy('experience')}>
        {experience.map((job, jobIdx) => {
          const open = !!job._open;
          return (
            <div
              key={jobIdx}
              className={`ResumeEditor__job ${open ? 'ResumeEditor__job--open' : ''}`}
            >
              <div className="ResumeEditor__job-head">
                <button
                  type="button"
                  className="ResumeEditor__job-toggle"
                  onClick={() => toggleJob(jobIdx)}
                  aria-expanded={open}
                >
                  <span className="ResumeEditor__job-num">#{jobIdx + 1}</span>
                  <span className="ResumeEditor__job-summary">{jobSummary(job)}</span>
                  <span className="ResumeEditor__chevron">{open ? '▾' : '▸'}</span>
                </button>
                <div className="ResumeEditor__job-actions">
                  <button
                    type="button"
                    onClick={() => moveJob(jobIdx, -1)}
                    disabled={jobIdx === 0}
                    aria-label="Move up"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveJob(jobIdx, 1)}
                    disabled={jobIdx === experience.length - 1}
                    aria-label="Move down"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateJob(jobIdx)}
                    aria-label="Duplicate"
                    title="Duplicate"
                  >
                    ⎘
                  </button>
                  <button
                    type="button"
                    onClick={() => removeJob(jobIdx)}
                    aria-label="Remove job"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>

              {open && (
                <div className="ResumeEditor__job-body">
                  <label>
                    <span>title</span>
                    <input
                      type="text"
                      value={job.title || ''}
                      onChange={(e) => updateJob(jobIdx, 'title', e.target.value)}
                    />
                  </label>
                  <label>
                    <span>company</span>
                    <input
                      type="text"
                      value={job.company || ''}
                      onChange={(e) => updateJob(jobIdx, 'company', e.target.value)}
                    />
                  </label>
                  <label>
                    <span>location</span>
                    <input
                      type="text"
                      value={job.location || ''}
                      onChange={(e) => updateJob(jobIdx, 'location', e.target.value)}
                    />
                  </label>
                  <div className="ResumeEditor__job-dates">
                    <label>
                      <span>start</span>
                      <input
                        type="text"
                        placeholder="2022"
                        value={job.start || ''}
                        onChange={(e) => updateJob(jobIdx, 'start', e.target.value)}
                      />
                    </label>
                    <label>
                      <span>end</span>
                      <input
                        type="text"
                        placeholder="Present"
                        value={job.end || ''}
                        onChange={(e) => updateJob(jobIdx, 'end', e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="ResumeEditor__achievements">
                    <span className="ResumeEditor__achievements-label">Achievements</span>
                    {(job.achievements || []).map((a, achIdx) => (
                      <div key={achIdx} className="ResumeEditor__row">
                        <input
                          type="text"
                          value={a}
                          placeholder="Built X, scaled Y..."
                          onChange={(e) => updateAchievement(jobIdx, achIdx, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeAchievement(jobIdx, achIdx)}
                          aria-label="Remove achievement"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="ResumeEditor__add ResumeEditor__add--inner"
                      onClick={() => addAchievement(jobIdx)}
                    >
                      + Add achievement
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <button type="button" className="ResumeEditor__add" onClick={addJob}>
          + Add job
        </button>
      </Section>

      <Section title="Skills" isDummy={isDummy('skills')}>
        {SKILL_GROUPS.map((g) => (
          <label key={g}>
            <span>{g} (comma-separated)</span>
            <input
              type="text"
              value={(user.skills?.[g] || []).join(', ')}
              onChange={(e) => updateSkills(g, e.target.value)}
            />
          </label>
        ))}
      </Section>

      <Section title="Education" isDummy={isDummy('education')}>
        {(user.education || []).map((e, i) => (
          <div key={i} className="ResumeEditor__row">
            <input
              placeholder="degree"
              value={e.degree || ''}
              onChange={(ev) => updateEduItem(i, 'degree', ev.target.value)}
            />
            <input
              placeholder="school"
              value={e.school || ''}
              onChange={(ev) => updateEduItem(i, 'school', ev.target.value)}
            />
            <input
              placeholder="year"
              value={e.year || ''}
              onChange={(ev) => updateEduItem(i, 'year', ev.target.value)}
            />
            <button type="button" onClick={() => removeEdu(i)} aria-label="Remove">
              ×
            </button>
          </div>
        ))}
        <button type="button" className="ResumeEditor__add" onClick={addEdu}>
          + Add education
        </button>
      </Section>

      <button type="button" className="ResumeEditor__clear" onClick={reset}>
        Reset all to dummy
      </button>
    </aside>
  );
}
