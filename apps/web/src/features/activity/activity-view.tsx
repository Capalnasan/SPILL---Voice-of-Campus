"use client";

import { useState } from "react";
import Link from "next/link";
import { AtSign, Heart, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import styles from "./activity-view.module.css";

const seedActivity = [
  {
    id: "a1",
    type: "reply",
    actor: "notetaker",
    text: "replied to your spill",
    preview: "this is exactly how my week has felt too.",
    time: "12m",
    unread: true,
    href: "/post/midnight-library",
  },
  {
    id: "a2",
    type: "like",
    actor: "5 people",
    text: "felt your spill",
    preview: "got an A on my orgo midterm!!!",
    time: "48m",
    unread: true,
    href: "/post/north-star",
  },
  {
    id: "a3",
    type: "mention",
    actor: "softlaunch",
    text: "mentioned you in a reply",
    preview: "@sunflower said it better than I could.",
    time: "3h",
    unread: false,
    href: "/post/soft-launch",
  },
  {
    id: "a4",
    type: "safety",
    actor: "Spill safety",
    text: "checked in on a report",
    preview: "Thanks for looking out for your community. We handled it.",
    time: "1d",
    unread: false,
    href: "/community-rules",
  },
];

const iconMap = {
  reply: MessageCircle,
  like: Heart,
  mention: AtSign,
  safety: ShieldCheck,
};

export function ActivityView() {
  const [activeTab, setActiveTab] = useState<"all" | "replies">("all");
  const [activity, setActivity] = useState(seedActivity);
  const visible = activeTab === "replies" ? activity.filter((item) => item.type === "reply") : activity;
  const unreadCount = activity.filter((item) => item.unread).length;

  function markAllRead() {
    setActivity((items) => items.map((item) => ({ ...item, unread: false })));
  }

  return (
    <main>
      <PageHeading
        title="Activity"
        description="The replies, reactions, and moments that found their way back to you."
        action={
          unreadCount ? (
            <button type="button" onClick={markAllRead} className={styles.markRead}>
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
              onClick={() =>
                setActivity((items) =>
                  items.map((candidate) =>
                    candidate.id === item.id ? { ...candidate, unread: false } : candidate,
                  ),
                )
              }
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

