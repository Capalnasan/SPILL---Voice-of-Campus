"use client";

import { useState } from "react";
import Link from "next/link";
import { AtSign, Heart, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { useSpill } from "@/providers/spill-provider";
import styles from "./activity-view.module.css";

const iconMap = {
  reply: MessageCircle,
  like: Heart,
  mention: AtSign,
  safety: ShieldCheck,
};

export function ActivityView() {
  const [activeTab, setActiveTab] = useState<"all" | "replies">("all");
  const { activity, markActivityRead, markAllActivityRead, unreadActivityCount } = useSpill();
  const visible = activeTab === "replies" ? activity.filter((item) => item.type === "reply") : activity;

  return (
    <main>
      <PageHeading
        title="Activity"
        description="The replies, reactions, and moments that found their way back to you."
        action={
          unreadActivityCount ? (
            <button type="button" onClick={markAllActivityRead} className={styles.markRead}>
              Mark all read
            </button>
          ) : null
        }
      />

      <div className={styles.tabs} role="tablist" aria-label="Activity filter">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "all"}
          className={activeTab === "all" ? styles.active : ""}
          onClick={() => setActiveTab("all")}
        >
          All activity
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "replies"}
          className={activeTab === "replies" ? styles.active : ""}
          onClick={() => setActiveTab("replies")}
        >
          Replies
        </button>
      </div>

      <section aria-label="Recent activity" className={styles.list}>
        {visible.map((item) => {
          const Icon = iconMap[item.type as keyof typeof iconMap];
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.item} ${item.unread ? styles.unread : ""}`}
              onClick={() => markActivityRead(item.id)}
            >
              <span className={`${styles.icon} ${styles[item.type]}`}>
                <Icon size={19} aria-hidden="true" />
              </span>
              <span className={styles.copy}>
                <span>
                  <strong>{item.actor}</strong> {item.text}
                </span>
                <small>{item.preview}</small>
              </span>
              <time>{item.time}</time>
            </Link>
          );
        })}
      </section>

      <aside className={styles.footerNote}>
        <Sparkles size={19} aria-hidden="true" />
        <span>You’re all caught up. Go be part of a good conversation.</span>
      </aside>
    </main>
  );
}

