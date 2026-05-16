import { useState } from 'react';
import saveIcon from '../../assets/svg/save-f.svg';
import addIcon from '../../assets/svg/plus-circle.svg';
import removeIcon from '../../assets/svg/minus-circle.svg';

import './index.scss';

function EditExperience({ experience, setIsEditModeOn, updateExperience }) {
  const [currentExperience, setCurrentExperience] = useState(experience);

  const updatedExperienceData = () => {
    updateExperience({
      startDuration: document.getElementById('start-duration').value,
      endDuration: document.getElementById('end-duration').value,
      title: document.getElementById('title').value,
      subtitle: document.getElementById('subtitle').value,
      editModeOn: false,
      responsibilities: Array.from(
        document.getElementsByClassName('experience-item')
      ).map((item) => item.value),
    });
    setIsEditModeOn(false);
  };

  const addResponsibility = () => {
    setCurrentExperience((prev) => ({
      ...prev,
      responsibilities: ['', ...prev.responsibilities],
    }));
  };

  const removeResponsibility = ({ target }) => {
    setCurrentExperience((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter(
        (r, i) => i !== parseInt(target.id)
      ),
    }));
  };

  const handleInputChange = ({ target }) => {
    setCurrentExperience((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.map((r, i) =>
        i === parseInt(target.id) ? target.value : r
      ),
    }));
  };

  return (
    <div className="ExperienceComponent">
      <div className="left-column">
        <input
          id="start-duration"
          defaultValue={currentExperience.startDuration}
          type="text"
        />
        <br />
        <input
          id="end-duration"
          defaultValue={currentExperience.endDuration}
          type="text"
        />
      </div>
      <div className="right-column">
        <div className="title">
          <input
            className="title"
            id="title"
            defaultValue={currentExperience.title}
            type="text"
          />
          <img
            className="edit-icon"
            src={saveIcon}
            alt="Save icon"
            onClick={updatedExperienceData}
          />
        </div>
        <input
          id="subtitle"
          defaultValue={currentExperience.subtitle}
          type="text"
        />
        <div className="edit-experience-list">
          <ul>
            {currentExperience.responsibilities &&
              currentExperience.responsibilities.map((res, i) => (
                <div className="edit-experience-item" key={i}>
                  <textarea
                    className="experience-item"
                    value={res}
                    type="text"
                    onChange={handleInputChange}
                    id={i}
                  />
                  <img
                    className="edit-icon"
                    src={removeIcon}
                    alt="Remove icon"
                    onClick={removeResponsibility}
                    id={i}
                  />
                </div>
              ))}
          </ul>
          <img
            className="edit-icon"
            src={addIcon}
            alt="Add icon"
            onClick={addResponsibility}
          />
        </div>
      </div>
    </div>
  );
}

export default EditExperience;
