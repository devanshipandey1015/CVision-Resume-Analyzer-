import { useMemo, useState } from "react";
import type { User } from "../types";
import { getCurrentUser, login, logout, signup } from "../utils/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());

  const auth = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      signup: (name: string, email: string, password: string) => {
        const result = signup(name, email, password);
        setUser(getCurrentUser());
        return result;
      },
      login: (email: string, password: string) => {
        const result = login(email, password);
        setUser(getCurrentUser());
        return result;
      },
      logout: () => {
        logout();
        setUser(null);
      },
      refresh: () => setUser(getCurrentUser()),
    }),
    [user],
  );

  return auth;
}
