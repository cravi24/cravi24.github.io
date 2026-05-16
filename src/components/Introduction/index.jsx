import { useState } from 'react';
import './index.scss';
import editPencil from '../../assets/svg/pencil-f.svg';
import saveIcon from '../../assets/svg/save-f.svg';
import IconHeader from '../IconHeader';

function Introduction() {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [name, setName] = useState('Pratiksha Chaudhary');
  const [title, setTitle] = useState('Frontend Software Engineer');
  const [summary, setSummary] = useState(
    `To work in a professional organization that gives an opportunity of continuous learning and demands proactive, talented and dedicated people to boost the company's growth`
  );

  const saveIntroduction = (e) => {
    setName(document.getElementsByClassName('candidate-name')[0].value);
    setTitle(document.getElementsByClassName('candidate-title')[0].value);
    setSummary(document.getElementsByClassName('candidate-summary')[0].value);
    setIsEditModeOn(false);
  };

  if (isEditModeOn)
    return editableIntroduction(name, title, summary, saveIntroduction);
  return (
    <div className="IntroductionComponent">
      <IconHeader
        editPencil={editPencil}
        header={name}
        setIsEditModeOn={() => setIsEditModeOn(true)}
        styleClass="candidate-name"
      />
      <div className="candidate-title">{title}</div>
      <p className="candidate-summary">{summary}</p>
    </div>
  );
}

const editableIntroduction = (name, title, summary, saveIntroduction) => (
  <div className="IntroductionComponent">
    <div className="candidate-header">
      <input className="candidate-name" defaultValue={name} type="text" />
      <img src={saveIcon} onClick={saveIntroduction} alt="save icon" />
    </div>
    <input className="candidate-title" defaultValue={title} type="text" />
    <textarea
      className="candidate-summary"
      defaultValue={summary}
      type="text"
    />
  </div>
);

export default Introduction;
