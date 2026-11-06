const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Small fetch wrapper: reuse for every new endpoint in the coding round.
export async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok && res.status !== 503) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

export const getHealth = () => request("/api/health");
