export default function SkillItem({ skill, index, themeId, onSkillValidationChange }) {
  const validation = skill?.validation || "KO";

  function handleChange(e) {
    const newValue = e.target.value;
    if (onSkillValidationChange) {
      onSkillValidationChange(themeId, index, newValue);
    }
  }

  // On garde une classe couleur pour le select, selon la valeur
  let badgeClass = "badge badge-ko";
  if (validation === "OK") badgeClass = "badge badge-ok";
  if (validation === "PROGRESS") badgeClass = "badge badge-progress";

  return (
    <li className="skill">
      <span className="skill-label">{skill.label}</span>

      <select className={`badge-select ${badgeClass}`} value={validation} onChange={handleChange}>
        <option value="KO">KO</option>
        <option value="PROGRESS">PROGRESS</option>
        <option value="OK">OK</option>
      </select>
    </li>
  );
}