import { useState, useEffect } from 'react';
import dummyResume from '../data/dummyResume.em';

const STORAGE_KEY = 'resume-builder.user-data.v1';
const EMPTY = { personal: {}, summary: '', experience: [], skills: {}, education: [] };

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function nonEmpty(v) {
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'string') return v.trim().length > 0;
  if (v && typeof v === 'object') return Object.keys(v).some((k) => nonEmpty(v[k]));
  return v != null;
}

function merge(user, dummy) {
  return {
    personal: {
      ...dummy.personal,
      ...Object.fromEntries(
        Object.entries(user.personal || {}).filter(([, v]) => nonEmpty(v))
      ),
    },
    summary: nonEmpty(user.summary) ? user.summary : dummy.summary,
    experience: nonEmpty(user.experience) ? user.experience : dummy.experience,
    skills: {
      leadership: nonEmpty(user.skills?.leadership) ? user.skills.leadership : dummy.skills.leadership,
      technical: nonEmpty(user.skills?.technical) ? user.skills.technical : dummy.skills.technical,
      domains: nonEmpty(user.skills?.domains) ? user.skills.domains : dummy.skills.domains,
    },
    education: nonEmpty(user.education) ? user.education : dummy.education,
  };
}

export default function useResume() {
  const [user, setUser] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // localStorage may be unavailable (private mode, quota); ignore.
    }
  }, [user]);

  const merged = merge(user, dummyResume);
  const isDummy = (section) => !nonEmpty(user[section]);
  const reset = () => setUser(EMPTY);

  return { user, setUser, merged, isDummy, reset };
}
