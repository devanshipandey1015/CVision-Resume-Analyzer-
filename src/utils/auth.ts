import type { AuthSession, User } from "../types";
import { getLS, setLS, StorageKeys } from "./storage";

export function getUsers(): User[] {
  return getLS<User[]>(StorageKeys.users, []);
}

export function signup(name: string, email: string, password: string): { ok: boolean; message: string } {
  const users = getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return { ok: false, message: "Email already exists." };

  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    joinedAt: new Date().toISOString(),
  };
  setLS(StorageKeys.users, [...users, user]);
  setLS<AuthSession>(StorageKeys.session, { userId: user.id });
  return { ok: true, message: "Account created." };
}

export function login(email: string, password: string): { ok: boolean; message: string } {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return { ok: false, message: "Invalid email or password." };
  setLS<AuthSession>(StorageKeys.session, { userId: user.id });
  return { ok: true, message: "Welcome back!" };
}

export function logout(): void {
  localStorage.removeItem(StorageKeys.session);
}

export function getCurrentUser(): User | null {
  const session = getLS<AuthSession | null>(StorageKeys.session, null);
  if (!session) return null;
  return getUsers().find((u) => u.id === session.userId) ?? null;
}

export function updateUserName(userId: string, name: string): void {
  const users = getUsers().map((u) => (u.id === userId ? { ...u, name } : u));
  setLS(StorageKeys.users, users);
}
