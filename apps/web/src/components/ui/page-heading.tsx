import type { ReactNode } from "react";
import styles from "./page-heading.module.css";

type PageHeadingProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeading({ title, description, action }: PageHeadingProps) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={`display-type ${styles.title}`}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
}

