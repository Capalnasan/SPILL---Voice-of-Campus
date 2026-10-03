import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./policy.module.css";

export type PolicySection = {
  id: string;
  title: string;
  content: ReactNode;
};

type PolicyShellProps = {
  title: string;
  description: string;
  sections: PolicySection[];
  accent?: "coral" | "violet";
  children?: ReactNode;
};

export function PolicyShell({
  title,
  description,
  sections,
  accent = "violet",
  children,
}: PolicyShellProps) {
  return (
    <div className={`${styles.page} ${styles[accent]}`}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Spill home">
          spill<span aria-hidden="true" />
        </Link>
        <nav aria-label="Public pages">
          <Link href="/community-rules">Community rules</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <Link className={styles.feedLink} href="/feed">
          Enter the feed
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
        </Link>
      </header>

      <main>
        <div className={styles.hero}>
          <Link className={styles.backLink} href="/">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10H5M9 6l-4 4 4 4" /></svg>
            Back to Spill
          </Link>
          <h1>{title}</h1>
          <p>{description}</p>
          <span className={styles.underline} aria-hidden="true" />
          <span className={styles.heroShape} aria-hidden="true" />
        </div>

        {children}

        <div className={styles.contentGrid}>
          <aside className={styles.contents}>
            <p>On this page</p>
            <nav aria-label={`${title} sections`}>
              {sections.map((section, index) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className={styles.article}>
            {sections.map((section, index) => (
              <section id={section.id} key={section.id}>
                <span className={styles.sectionNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{section.title}</h2>
                  {section.content}
                </div>
              </section>
            ))}
            <p className={styles.updated}>Last updated September 14, 2026</p>
          </article>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/" aria-label="Spill home">spill</Link>
        <p>Honest conversations. Human boundaries.</p>
        <nav aria-label="Legal">
          <Link href="/community-rules">Community rules</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </div>
  );
}
