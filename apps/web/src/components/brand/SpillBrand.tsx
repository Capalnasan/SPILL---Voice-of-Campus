import Link from "next/link";
import Image from "next/image";

import styles from "./SpillBrand.module.css";

type SpillBrandProps = Readonly<{
  className?: string;
  href?: string;
  variant?: "compact" | "long";
}>;

export function SpillBrand({ className, href = "/", variant = "long" }: SpillBrandProps) {
  const brandClassName = className ? `${styles.brand} ${className}` : styles.brand;

  return (
    <Link className={brandClassName} href={href} aria-label="Spill home">
      <span className={styles.artwork} aria-hidden="true">
        <Image className={styles.light} src={`/brand/spill-${variant}-light.png`} alt=""
          width={variant === "compact" ? 640 : 768} height={variant === "compact" ? 372 : 296} unoptimized />
        <Image className={styles.dark} src={`/brand/spill-${variant}-dark.png`} alt=""
          width={variant === "compact" ? 640 : 768} height={variant === "compact" ? 372 : 296} unoptimized />
      </span>
    </Link>
  );
}
