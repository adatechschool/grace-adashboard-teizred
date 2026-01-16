import { useState } from "react";

export default function ThemeForm({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [skills, setSkills] = useState([{ label: "", validation: "KO" }]);

  function addSkill() {
    setSkills([...skills, { label: "", validation: "KO" }]);
  }

  function updateSkill(index, field, value) {
    setSkills(skills.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function removeSkill(index) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate({ name: name.trim(), skills });
    setName("");
    setSkills([{ label: "", validation: "KO" }]);
    setOpen(false);
  }

  return (
    <>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        Add theme
      </button>

      {open && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Add theme</h2>
              <button
                type="button"
                className="icon-btn"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nom du thème"
                />
              </div>

              <div className="modal-skills">
                <div className="modal-skills-header">
                  <span className="label">Skills</span>
                  <button type="button" className="btn-ghost" onClick={addSkill}>
                    + Ajouter
                  </button>
                </div>

                <div className="modal-skill-list">
                  {skills.map((skill, index) => (
                    <div key={index} className="modal-skill-row">
                      <input
                        className="input"
                        value={skill.label}
                        onChange={(e) => updateSkill(index, "label", e.target.value)}
                        placeholder="Je sais ..."
                      />

                      <select
                        className="select"
                        value={skill.validation}
                        onChange={(e) => updateSkill(index, "validation", e.target.value)}
                      >
                        <option value="KO">pas acquis</option>
                        <option value="PROGRESS">en cours</option>
                        <option value="OK">acquis</option>
                      </select>

                      <button
                        type="button"
                        className="icon-btn danger"
                        aria-label="Remove skill"
                        onClick={() => removeSkill(index)}
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
                  Annuler
                </button>
                <button className="btn-primary" type="submit">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}