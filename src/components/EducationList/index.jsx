import { useState } from 'react';
import './index.scss';
import addIcon from '../../assets/svg/plus-circle.svg';
import boxIcon from '../../assets/svg/degree.svg';
import educationDegrees from './education.json';
import Experience from '../Experience';
import IconHeader from '../IconHeader';

function EducationList() {
  const [educationDegreeArr, setEducationDegreeArr] = useState(
    educationDegrees
  );

  return (
    <div className="EducationListComponent">
      <IconHeader
        icon={boxIcon}
        header="Education"
        editPencil={addIcon}
        setIsEditModeOn={() => {}}
      />
      {educationDegreeArr.map((degree, i) => (
        <Experience
          experience={degree}
          key={i}
          updateWorkExperience={setEducationDegreeArr}
        />
      ))}
    </div>
  );
}

export default EducationList;
