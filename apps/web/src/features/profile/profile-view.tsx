"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeOff, Settings, Sparkles } from "lucide-react";
import { PostCard } from "@/components/app/post-card";
import { useSpill } from "@/providers/spill-provider";
import styles from "./profile-view.module.css";

type ProfileTab = "spills" | "replies" | "media";

export function ProfileView() {
  const { posts } = useSpill();
  const [activeTab, setActiveTab] = useState<ProfileTab>("spills");
  const myPosts = posts.filter((post) => post.author === "sunflower" || post.id.startsWith("local-"));

  return (
    <main>
      <section className={styles.cover}>
        <div className={styles.inkShape} aria-hidden="true" />
        <Link href="/settings" className={styles.settings} aria-label="Open settings">
          <Settings size={18} aria-hidden="true" />
        </Link>
      </section>

      <section className={styles.identity}>
        <div className={styles.avatar} aria-hidden="true"><Sparkles size={29} /></div>
        <div className={styles.nameRow}>
          <div>
            <h1 className="display-type">sunflower</h1>
            <p>@sunflower · joined this semester</p>
          </div>
          <button type="button">Edit profile</button>
        </div>
        <p className={styles.bio}>finding tiny bright spots between deadlines.</p>
        <div className={styles.stats}>
          <span><strong>{myPosts.length || 12}</strong> spills</span>
          <span><strong>286</strong> followers</span>
          <span><strong>194</strong> following</span>
        </div>
        <div className={styles.privacyNote}>
          <EyeOff size={16} aria-hidden="true" />
          <span>Your anonymous spills never appear on your public profile.</span>
        </div>
      </section>

      <div className={styles.tabs} role="tablist" aria-label="Profile content">
        {(["spills", "replies", "media"] as ProfileTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? styles.active : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <section className={styles.feed} aria-live="polite">
        {activeTab === "spills" ? (
          myPosts.length ? (
            myPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className={styles.empty}>
              <h2 className="display-type">Your first spill is waiting.</h2>
              <p>Say something honest when you’re ready.</p>
            </div>
          )
        ) : (
          <div className={styles.empty}>
            <h2 className="display-type">
              {activeTab === "replies" ? "No public replies yet." : "No photos yet."}
            </h2>
            <p>This part of your story is still unwritten.</p>
          </div>
        )}
      </section>
    </main>
  );
}

