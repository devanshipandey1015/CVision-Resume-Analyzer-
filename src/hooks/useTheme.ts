import { useEffect, useState } from "react";
import { getLS, setLS, StorageKeys } from "../utils/storage";

export function useTheme() {
  const [darkMode, setDarkMode] = useState<boolean>(() => getLS(StorageKeys.theme, false));

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    setLS(StorageKeys.theme, darkMode);
  }, [darkMode]);

  return { darkMode, setDarkMode };
}
