import addIcon from '../../assets/svg/plus-circle.svg';
import boxIcon from '../../assets/svg/box.svg';
import workExperienceList from './work-history.json';
import { useState } from 'react';
import Experience from '../Experience';
import IconHeader from '../IconHeader';

function WorkHistoryList() {
  const [workExperienceArr, setWorkExperienceArr] = useState(
    workExperienceList
  );
  return (
    <div className="WorkHistoryListComponent">
      <IconHeader
        icon={boxIcon}
        header="Work History"
        editPencil={addIcon}
        setIsEditModeOn={() => {
          const placeHolderREsponsibility = {
            startDuration: '2010',
            title: 'your title',
            subtitle: 'your subtitle',
            responsibilities: ['your responsibility 1'],
            editModeOn: true,
          };
          setWorkExperienceArr((prev) => [placeHolderREsponsibility, ...prev]);
        }}
      />
      {workExperienceArr.map((workItem, i) => (
        <Experience
          experience={workItem}
          key={i}
          updateWorkExperience={setWorkExperienceArr}
        />
      ))}
    </div>
  );
}

export default WorkHistoryList;
