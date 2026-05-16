import { useState } from 'react';

import './index.scss';

function EditSkills({ skills }) {
  const [currentSkills, setCurrentSkills] = useState(skills);
  const [isRatingInFocus, setIsRatingInFocus] = useState(
    new Array(skills.length * 5).fill(false)
  );

  const updateSkillRating = ({ target }) => {
    const newRating = 5 - parseInt(target.getAttribute("data-id"));
    const skill = parseInt(target.closest('.edit-rating').id);
    setCurrentSkills((prev) => {
      const e = prev.map((cur, i) => {
        if (i === skill) {
          cur.rating = newRating;
        }
        return cur;
      });
      return e;
    });
  };

  const handleMouseEnter = ({ target }) => {
    const ratingId = parseInt(target.id);
    const updatedIsRatingInFocus = [...isRatingInFocus];
    updatedIsRatingInFocus[ratingId] = true;
    setIsRatingInFocus(updatedIsRatingInFocus);
  };

  const handleMouseLeave = ({ target }) => {
    const ratingId = parseInt(target.id);
    const updatedIsRatingInFocus = [...isRatingInFocus];
    updatedIsRatingInFocus[ratingId] = false;
    setIsRatingInFocus(updatedIsRatingInFocus);
  };

  const getClassNameForSkill = (skillId, ratingId) => {
    if (!isRatingInFocus[parseInt(`{${skillId}${ratingId}`)]) {
      return currentSkills[skillId].rating >= 5 - ratingId && 'filled-circle';
    }

    return 'filled-circle';
  };

  return (
    <div className="SkillsComponent">
      {currentSkills.map((skill, i) => {
        return (
          <div className="skill" key={i}>
            {skill.name}
            <div className="edit-rating" id={i}>
              {[...Array(5)].map((item, index) => (
                <div
                  className={`edit-circle ${getClassNameForSkill(
                    i,
                    index
                  )}`}
                  onClick={updateSkillRating}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                  data-id={index}
                  id={`${i}${index}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EditSkills;
