import { useState } from 'react';
import './index.scss';
import flagIcon from '../../assets/svg/flag.svg';
import saveIcon from '../../assets/svg/save-f.svg';
import editPencil from '../../assets/svg/pencil-f.svg';
import IconHeader from '../IconHeader';

import skills from './skills.json';
import Skills from '../Skills';

function Language() {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  return (
    <div className="LanguageComponent">
      <IconHeader
        icon={flagIcon}
        header="Language"
        editPencil={isEditModeOn ? saveIcon : editPencil}
        setIsEditModeOn={() => setIsEditModeOn(!isEditModeOn)}
      />
      <Skills
        skills={skills}
        isEditModeOn={isEditModeOn}
        setIsEditModeOn={setIsEditModeOn}
      />
    </div>
  );
}

export default Language;
