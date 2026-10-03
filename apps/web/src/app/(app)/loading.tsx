import styles from "./state.module.css";

export default function AppLoading() {
  return <div className={styles.state} role="status" aria-label="Loading page"><div className={styles.loading} aria-hidden="true"><i /><i /><i /><i /></div></div>;
}
