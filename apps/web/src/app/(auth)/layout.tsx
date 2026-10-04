import Link from "next/link";
import type { ReactNode } from "react";
import { SpillBrand } from "@/components/brand/SpillBrand";
import styles from "./auth.module.css";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <SpillBrand className={styles.brand} />
        <Link className={styles.homeLink} href="/">
          Back to Spill
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h11M11 6l4 4-4 4" />
          </svg>
        </Link>
      </header>

      <main className={styles.main}>
        <section className={styles.story} aria-label="About Spill">
          <div className={styles.storyInner}>
            <span className={styles.spark} aria-hidden="true" />
            <h1>A little honesty changes the whole conversation.</h1>
            <p>
              Join a kinder space for honest thoughts, small confessions, and the
              conversations that feel better when they are real.
            </p>
            <div className={styles.promise}>
              <span className={styles.promiseIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3.4 19 6v5.2c0 4.4-2.8 7.8-7 9.5-4.2-1.7-7-5.1-7-9.5V6l7-2.6Z" />
                  <path d="m9.2 12 1.8 1.8 3.9-4" />
                </svg>
              </span>
              <span>
                <strong>Pseudonymous by default.</strong>
                <small>Your voice is yours to share.</small>
              </span>
            </div>
          </div>
          <p className={styles.handNote}>say it honestly.<br />keep it human.</p>
          <span className={styles.violetBrush} aria-hidden="true" />
          <span className={styles.limeDot} aria-hidden="true" />
        </section>

        <section className={styles.formColumn}>{children}</section>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 Spill</span>
        <nav aria-label="Legal">
          <Link href="/community-rules">Community rules</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </div>
  );
}
