const KEYS = {
  users: "cvision_users",
  session: "cvision_session",
  analyses: "cvision_analyses",
  theme: "cvision_theme",
  seed: "cvision_seeded",
};

export function getLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setLS<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const StorageKeys = KEYS;
