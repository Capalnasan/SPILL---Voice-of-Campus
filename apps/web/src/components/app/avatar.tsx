import { Flower2, Ghost, Moon, Sparkles, Star } from "lucide-react";
import type { Post } from "@/types/models";
import styles from "./avatar.module.css";

type AvatarProps = Pick<Post, "avatar" | "avatarTone"> & {
  size?: "small" | "medium" | "large";
  label?: string;
};

const icons = {
  moon: Moon,
  flower: Flower2,
  star: Star,
  ghost: Ghost,
  spark: Sparkles,
};

export function Avatar({ avatar, avatarTone, size = "medium", label }: AvatarProps) {
  const Icon = icons[avatar];

  return (
    <span
      className={`${styles.avatar} ${styles[avatarTone]} ${styles[size]}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon aria-hidden="true" strokeWidth={2.15} />
    </span>
  );
}

