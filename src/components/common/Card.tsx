import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
}

export function Card({ title, right, children }: CardProps) {
  return (
    <section className="card">
      {(title || right) && (
        <div className="card-header">
          {title ? <h3>{title}</h3> : <span />}
          {right}
        </div>
      )}
      {children}
    </section>
  );
}
