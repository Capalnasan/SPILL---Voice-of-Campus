"use client";

import { useEffect } from "react";
import styles from "./state.module.css";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return <div className={styles.state} role="alert"><h2 className="display-type">That spill hit a snag.</h2><p>Your place is safe. Try this page again, or head back to the feed.</p><button type="button" onClick={reset}>Try again</button></div>;
}
