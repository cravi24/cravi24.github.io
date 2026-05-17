import { useState } from 'react';
import TemplatePicker from '../../components/TemplatePicker';
import ResumeEditor from '../../components/ResumeEditor';
import Templates from '../../templates';
import useResume from '../../hooks/useResume';
import './index.scss';

const ResumeBuilderPage = () => {
  const [templateKey, setTemplateKey] = useState('modern');
  const [editorOpen, setEditorOpen] = useState(true);
  const { user, setUser, merged, isDummy, reset } = useResume();
  const Template = Templates[templateKey].component;

  return (
    <div className="resume-page">
      <div className="resume-controls">
        <TemplatePicker value={templateKey} onChange={setTemplateKey} />
        <button
          type="button"
          className="resume-toolbar-toggle"
          onClick={() => setEditorOpen(!editorOpen)}
        >
          {editorOpen ? 'Hide editor' : 'Edit resume'}
        </button>
        <button
          type="button"
          className="resume-toolbar-print"
          onClick={() => window.print()}
        >
          Print / PDF
        </button>
      </div>
      <div className={`resume-layout ${editorOpen ? 'with-editor' : ''}`}>
        {editorOpen && (
          <ResumeEditor user={user} setUser={setUser} isDummy={isDummy} reset={reset} />
        )}
        <div className="resume-preview">
          <Template resume={merged} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
