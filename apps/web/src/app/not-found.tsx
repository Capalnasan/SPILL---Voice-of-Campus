import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.spill} aria-hidden="true"><span>404</span></div>
      <p>Looks like this thought wandered off.</p>
      <h1 className="display-type">Nothing spilled here.</h1>
      <Link href="/feed">Back to the feed <ArrowRight size={18} aria-hidden="true" /></Link>
    </main>
  );
}

