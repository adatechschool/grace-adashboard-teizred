import { computeProgress } from "../utils/computeProgress";
import ProgressBar from "./ProgressBar";
import SkillList from "./SkillList";

export default function ThemeCard({ theme, onDelete, onSkillValidationChange }) {
  const percent = computeProgress(theme.skills);

  return (
    <div className="theme-card" id={`theme-${theme.id}`}>
      <h2 className="theme-title">{theme.name}</h2>

      <div className="meta">
        <span>Progression</span>
        <span>{percent}%</span>
      </div>

      <ProgressBar value={percent} />

      <SkillList
        themeId={theme.id}
        skills={theme.skills}
        onSkillValidationChange={onSkillValidationChange}
      />

      <button className="btn-danger" onClick={() => onDelete(theme.id)}>
        Supprimer
      </button>
    </div>
  );
}