"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, ChevronRight, EyeOff, UserRound } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import styles from "./settings-view.module.css";

const initialToggles = {
  anonymous: true,
  reactions: true,
  replies: true,
  digest: false,
};

export function SettingsView() {
  const [toggles, setToggles] = useState(initialToggles);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("spill.settings.v1");
    if (!saved) return;
    const frame = window.requestAnimationFrame(() => {
      try {
        setToggles({ ...initialToggles, ...JSON.parse(saved) });
      } catch {
        window.localStorage.removeItem("spill.settings.v1");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggle(key: keyof typeof initialToggles) {
    setToggles((current) => {
      const next = { ...current, [key]: !current[key] };
      window.localStorage.setItem("spill.settings.v1", JSON.stringify(next));
      return next;
    });
    setStatus("Preference saved");
    window.setTimeout(() => setStatus(""), 1600);
  }

  return (
    <main>
      <PageHeading title="Settings" description="Make Spill feel like your kind of space." />
      <div className={styles.content}>
        <section className={styles.section} aria-labelledby="privacy-title">
          <div className={styles.sectionHeading}>
            <EyeOff size={20} aria-hidden="true" />
            <div><h2 id="privacy-title">Privacy & identity</h2><p>Choose how you show up.</p></div>
          </div>
          <SettingToggle
            label="Anonymous by default"
            description="Start new spills with your identity hidden."
            checked={toggles.anonymous}
            onChange={() => toggle("anonymous")}
          />
        </section>

        <section className={styles.section} aria-labelledby="notifications-title">
          <div className={styles.sectionHeading}>
            <Bell size={20} aria-hidden="true" />
            <div><h2 id="notifications-title">Notifications</h2><p>Only the things you care about.</p></div>
          </div>
          <SettingToggle label="Reactions" description="When someone feels your spill." checked={toggles.reactions} onChange={() => toggle("reactions")} />
          <SettingToggle label="Replies & mentions" description="When the conversation finds you." checked={toggles.replies} onChange={() => toggle("replies")} />
          <SettingToggle label="Weekly digest" description="A calm recap, once a week." checked={toggles.digest} onChange={() => toggle("digest")} />
        </section>

        <section className={styles.section} aria-labelledby="account-title">
          <div className={styles.sectionHeading}>
            <UserRound size={20} aria-hidden="true" />
            <div><h2 id="account-title">Account</h2><p>The practical stuff.</p></div>
          </div>
          <div className={styles.linkRow}><span className={styles.linkLabel}>Email</span><span className={styles.value}>sunflower@spill.local</span></div>
          <Link href="/community-rules" className={styles.linkRow}>Community rules <ChevronRight size={18} /></Link>
          <Link href="/" className={`${styles.linkRow} ${styles.signOut}`}>Log out <ChevronRight size={18} /></Link>
        </section>
      </div>
      <div className={`${styles.toast} ${status ? styles.toastVisible : ""}`} role="status" aria-live="polite">{status}</div>
    </main>
  );
}

function SettingToggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={styles.row}>
      <span><strong>{label}</strong><small>{description}</small></span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className={`${styles.switch} ${checked ? styles.switchOn : ""}`} aria-hidden="true"><span /></span>
    </label>
  );
}


