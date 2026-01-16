import SkillItem from "./SkillItem";

export default function SkillList({ themeId, skills, onSkillValidationChange }) {
  return (
    <ul className="skills" id="skills-list">
      {skills.map((skill, index) => (
        <SkillItem
          key={index}
          skill={skill}
          index={index}
          themeId={themeId}
          onSkillValidationChange={onSkillValidationChange}
        />
      ))}
    </ul>
  );
}