import Link from "next/link";

import styles from "./SpillBrand.module.css";

type SpillBrandProps = Readonly<{
  className?: string;
  href?: string;
}>;

export function SpillBrand({ className, href = "/" }: SpillBrandProps) {
  const brandClassName = className ? `${styles.brand} ${className}` : styles.brand;

  return (
    <Link className={brandClassName} href={href} aria-label="Spill home">
      <span className={styles.wordmark} aria-hidden="true">
        sp<span className={styles.letterI}>i<span className={styles.drop} /></span>ll
      </span>
    </Link>
  );
}
