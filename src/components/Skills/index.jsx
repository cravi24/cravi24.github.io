import EditSkills from './EditSkills';
import './index.scss';

function Skills({ skills, isEditModeOn, setIsEditModeOn }) {
  if (isEditModeOn) {
    return <EditSkills skills={skills} />;
  }
  return (
    <div className="SkillsComponent">
      {skills.map((skill, i) => {
        return (
          <div className="skill" key={i}>
            {skill.name}
            <div className="rating">
              {[...Array(5)].map((item, i) => (
                <div
                  className={`circle ${i < skill.rating && 'filled-circle'}`}
                  key={i}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Skills;
