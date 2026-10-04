"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeOff, Settings, Sparkles } from "lucide-react";
import { PostCard } from "@/components/app/post-card";
import { useSpill } from "@/providers/spill-provider";
import { ProfileEditor } from "./profile-editor";
import styles from "./profile-view.module.css";

type ProfileTab = "spills" | "replies" | "media";

export function ProfileView() {
  const { posts, replies, profile, storageReady, openComposer } = useSpill();
  const [activeTab, setActiveTab] = useState<ProfileTab>("spills");
  const [editing, setEditing] = useState(false);
  const myPosts = posts.filter((post) => !post.anonymous && (post.author === "sunflower" || post.id.startsWith("local-")));
  const mediaPosts = myPosts.filter((post) => post.image);
  const publicPosts = new Map(posts.filter((post) => !post.anonymous).map((post) => [post.id, post]));
  const myReplies = replies.filter((reply) => reply.author === "sunflower" && !reply.deleted && publicPosts.has(reply.postId))
    .sort((a, b) => b.createdAt - a.createdAt);
  const visiblePosts = activeTab === "media" ? mediaPosts : myPosts;

  return (
    <section aria-label="Your profile">
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
            <h1 className="display-type">{profile.displayName}</h1>
            <p>@sunflower · joined this semester</p>
          </div>
          <button type="button" disabled={!storageReady} onClick={() => setEditing(true)}>Edit profile</button>
        </div>
        <p className={styles.bio}>{profile.bio || "A little room for your story."}</p>
        <div className={styles.stats}>
          <span><strong>{myPosts.length}</strong> spills</span>
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
            id={`profile-tab-${tab}`}
            aria-controls="profile-content"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? styles.active : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <section className={styles.feed} id="profile-content" role="tabpanel" aria-labelledby={`profile-tab-${activeTab}`}>
        {!storageReady ? <p role="status">Loading your profile…</p> : activeTab === "replies" && myReplies.length ? (
          myReplies.map((reply) => (
            <Link key={reply.id} className={styles.replyCard} href={`/post/${reply.postId}`}>
              <small>In reply to @{publicPosts.get(reply.postId)?.author}</small>
              <p>{reply.content}</p>
              <span>{reply.likes} {reply.likes === 1 ? "like" : "likes"} · Join the conversation</span>
            </Link>
          ))
        ) : activeTab !== "replies" && visiblePosts.length ? (
          visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className={styles.empty}>
            <h2 className="display-type">
              {activeTab === "spills" ? "Your first spill is waiting." : activeTab === "replies" ? "No public replies yet." : "No photos yet."}
            </h2>
            <p>{activeTab === "replies" ? "Your replies to public spills will find a home here." : "Say something honest when you’re ready."}</p>
            {activeTab !== "replies" ? <button type="button" onClick={openComposer}>Create a spill</button> : <Link href="/feed">Find a conversation</Link>}
          </div>
        )}
      </section>
      {editing ? <ProfileEditor onClose={() => setEditing(false)} /> : null}
    </section>
  );
}

