import { useState } from "react";

interface AuthPageProps {
  onLogin: (email: string, password: string) => { ok: boolean; message: string };
  onSignup: (name: string, email: string, password: string) => { ok: boolean; message: string };
}

export function AuthPage({ onLogin, onSignup }: AuthPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = isSignup ? onSignup(name.trim(), email.trim(), password) : onLogin(email.trim(), password);
    setMessage(result.message);
  };

  return (
    <div className="auth-wrap">
      <form className="card auth-card" onSubmit={submit}>
        <h1>CVision</h1>
        <p>{isSignup ? "Create your account" : "Login to continue"}</p>
        {isSignup && <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minLength={6} />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        <button type="button" className="ghost" onClick={() => setIsSignup((v) => !v)}>
          {isSignup ? "Already have an account? Login" : "New user? Create account"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
