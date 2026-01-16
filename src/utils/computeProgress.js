export function computeProgress(skills) {
  if (!skills || skills.length === 0) return 0;

  let okCount = 0;

  for (let i = 0; i < skills.length; i++) {
    if (skills[i].validation === "OK") {
      okCount++;
    }
  }

  return Math.round((okCount / skills.length) * 100);
}