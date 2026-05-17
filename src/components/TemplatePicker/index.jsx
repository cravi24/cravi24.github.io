import { useState, useRef, useEffect } from 'react';
import Templates from '../../templates';
import './index.scss';

const TemplatePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const currentName = Templates[value]?.name || 'Select template';

  return (
    <div className="TemplatePickerComponent" ref={ref}>
      <button
        type="button"
        className={`TemplatePickerComponent__trigger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="TemplatePickerComponent__label">Template</span>
        <span className="TemplatePickerComponent__value">{currentName}</span>
        <svg
          className="TemplatePickerComponent__chevron"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className="TemplatePickerComponent__menu" role="listbox">
          {Object.entries(Templates).map(([key, { name }]) => {
            const active = key === value;
            return (
              <li
                key={key}
                role="option"
                aria-selected={active}
                className={`TemplatePickerComponent__option ${active ? 'is-active' : ''}`}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
              >
                <span className="TemplatePickerComponent__option-name">{name}</span>
                {active && (
                  <svg
                    className="TemplatePickerComponent__check"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7.5L6 10.5L11 4.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TemplatePicker;
