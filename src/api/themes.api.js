const BASE_URL = "http://localhost:3000";

export async function getThemes() {
  const res = await fetch(`${BASE_URL}/themes`);
  return await res.json();
}

export async function deleteTheme(id) {
  await fetch(`${BASE_URL}/themes/${id}`, {
    method: "DELETE",
  });
}

export async function createTheme(payload) {
  await fetch(`${BASE_URL}/themes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateTheme(id, payload) {
  const res = await fetch(`${BASE_URL}/themes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Si le back ne supporte pas PUT, on laisse l'erreur remonter
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Update failed: ${res.status} ${text}`);
  }

  // Certains back renvoient le theme mis à jour, d'autres rien
  try {
    return await res.json();
  } catch {
    return null;
  }
}