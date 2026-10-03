import type { ReactNode } from "react";
import styles from "./empty-state.module.css";

export function EmptyState({ description, icon, title }: { description: string; icon?: ReactNode; title: string }) {
  return (
    <div className={styles.empty}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <strong className="display-type">{title}</strong>
      <span>{description}</span>
    </div>
  );
}
