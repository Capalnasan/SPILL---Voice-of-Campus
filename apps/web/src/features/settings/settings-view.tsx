"use client";

import Link from "next/link";
import { Bell, ChevronRight, EyeOff, UserRound } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { useSpill } from "@/providers/spill-provider";
import styles from "./settings-view.module.css";

export function SettingsView() {
  const { preferences, storageReady, updatePreference } = useSpill();

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
            checked={preferences.anonymousByDefault}
            disabled={!storageReady}
            onChange={() => updatePreference("anonymousByDefault", !preferences.anonymousByDefault)}
          />
        </section>

        <section className={styles.section} aria-labelledby="notifications-title">
          <div className={styles.sectionHeading}>
            <Bell size={20} aria-hidden="true" />
            <div><h2 id="notifications-title">Notifications</h2><p>Only the things you care about.</p></div>
          </div>
          <SettingToggle label="Reactions" description="When someone feels your spill." checked={preferences.reactionNotifications} disabled={!storageReady} onChange={() => updatePreference("reactionNotifications", !preferences.reactionNotifications)} />
          <SettingToggle label="Replies & mentions" description="When the conversation finds you." checked={preferences.replyNotifications} disabled={!storageReady} onChange={() => updatePreference("replyNotifications", !preferences.replyNotifications)} />
          <SettingToggle label="Weekly digest" description="A calm recap, once a week." checked={preferences.weeklyDigest} disabled={!storageReady} onChange={() => updatePreference("weeklyDigest", !preferences.weeklyDigest)} />
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
    </main>
  );
}

function SettingToggle({ label, description, checked, disabled, onChange }: { label: string; description: string; checked: boolean; disabled?: boolean; onChange: () => void }) {
  return (
    <label className={styles.row}>
      <span><strong>{label}</strong><small>{description}</small></span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="sr-only" />
      <span className={`${styles.switch} ${checked ? styles.switchOn : ""}`} aria-hidden="true"><span /></span>
    </label>
  );
}


