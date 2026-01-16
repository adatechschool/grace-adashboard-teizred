import { useEffect, useState } from "react";
import { getThemes, deleteTheme, createTheme, updateTheme } from "../api/themes.api";
import ThemeCard from "../components/ThemeCard";
import ThemeForm from "../components/ThemeForm";

export default function Dashboard() {
  const [themes, setThemes] = useState([]);

  async function loadThemes() {
    const data = await getThemes();
    setThemes(data);
  }

  useEffect(() => {
    loadThemes();
  }, []);

  async function handleDelete(id) {
    await deleteTheme(id);
    loadThemes(); // on recharge la liste
  }

  async function handleCreate(payload) {
    await createTheme(payload);
    loadThemes(); // on recharge la liste
  }

  async function handleSkillValidationChange(themeId, skillIndex, newValidation) {
    // 1) Mise à jour immédiate du state (UI)
    let skillsToSend = null;

    setThemes((prev) =>
      prev.map((t) => {
        if (t.id !== themeId) return t;

        const newSkills = t.skills.map((s, i) =>
          i === skillIndex ? { ...s, validation: newValidation } : s
        );

        // On garde une copie pour tenter de sauvegarder côté back
        skillsToSend = newSkills;

        return { ...t, skills: newSkills };
      })
    );

    // 2) Tentative de sauvegarde côté back (optionnel)
    try {
      if (skillsToSend) {
        await updateTheme(themeId, { skills: skillsToSend });
      }
    } catch (e) {
      // IMPORTANT: on ne casse PAS l'UI si le back ne supporte pas PUT
      // (Sinon tu as l'impression que la progress bar "ne marche pas")
      console.warn("Sauvegarde impossible (PUT /themes/:id). Les changements restent côté front.");
    }
  }

  return (
    <div className="page" id="page-dashboard">
      <h1 id="page-title">Dashboard</h1>

      <ThemeForm onCreate={handleCreate} />

      {themes.map((theme) => (
        <ThemeCard
          key={theme.id}
          theme={theme}
          onDelete={handleDelete}
          onSkillValidationChange={handleSkillValidationChange}
        />
      ))}
    </div>
  );
}