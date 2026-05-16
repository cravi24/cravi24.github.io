import { useState } from 'react';
import './index.scss';
import cogsIcon from '../../assets/svg/cogs.svg';
import editPencil from '../../assets/svg/pencil-f.svg';
import saveIcon from '../../assets/svg/save-f.svg';
import IconHeader from '../IconHeader';
import skills from './skills.json';
import Skills from '../Skills';

function TechSkills() {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  return (
    <div className="TechSkillsComponent">
      <div className="work-history">
        <IconHeader
          icon={cogsIcon}
          header="Skills"
          editPencil={isEditModeOn ? saveIcon : editPencil}
          setIsEditModeOn={() => setIsEditModeOn(!isEditModeOn)}
        />
        <Skills
          skills={skills}
          isEditModeOn={isEditModeOn}
          setIsEditModeOn={setIsEditModeOn}
        />
      </div>
    </div>
  );
}

export default TechSkills;
