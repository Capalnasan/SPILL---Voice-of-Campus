"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  EyeOff,
  Flag,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Share2,
  Trash2,
  UserRoundX,
  VolumeX,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSpill } from "@/providers/spill-provider";
import type { Post } from "@/types/models";
import { Avatar } from "./avatar";
import styles from "./post-card.module.css";

export function PostCard({ post }: { post: Post }) {
  const { blockAuthor, muteAuthor, removePost, toggleLike, toggleSaved, updatePost, voteInPoll } = useSpill();
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(post.content);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (shareState === "idle") return;
    const timeout = window.setTimeout(() => setShareState("idle"), 1800);
    return () => window.clearTimeout(timeout);
  }, [shareState]);

  useEffect(() => {
    if (!feedback) return;
    const timeout = window.setTimeout(() => setFeedback(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  async function handleShare() {
    const url = `${window.location.origin}/post/${post.id}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: `@${post.author} on Spill`, text: post.content, url });
        setShareState("shared");
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareState("copied");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareState("idle");
    }
  }

  const postHref = `/post/${post.id}`;
  const isOwnPost = post.author === "sunflower" || post.id.startsWith("spill-");

  function reportPost() {
    setMenuOpen(false);
    setFeedback("Report received. Thanks for looking out for the community.");
  }

  function saveEdit() {
    if (!draft.trim()) return;
    updatePost(post.id, draft);
    setEditing(false);
    setFeedback("Your spill was updated.");
  }

  return (
    <article className={styles.card}>
      <Avatar avatar={post.avatar} avatarTone={post.avatarTone} size="large" label={`${post.author} avatar`} />

      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <Link href={postHref}><strong>{post.author}</strong></Link>
            <span className={styles.topic}>{post.topic}</span>
            <time dateTime={post.time === "now" ? new Date().toISOString() : undefined}>{post.time} ago</time>
            {post.anonymous ? <span className={styles.anonymous}>Anonymous</span> : null}
          </div>
          <button
            className={styles.more}
            type="button"
            aria-label={`More options for ${post.author}’s spill`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MoreHorizontal aria-hidden="true" />
          </button>
          {menuOpen ? (
            <div className={styles.menu} role="menu">
              {isOwnPost ? (
                <>
                  <button type="button" role="menuitem" onClick={() => { setEditing(true); setMenuOpen(false); }}>
                    <Pencil aria-hidden="true" /> Edit spill
                  </button>
                  <button className={styles.dangerAction} type="button" role="menuitem" onClick={() => removePost(post.id)}>
                    <Trash2 aria-hidden="true" /> Delete spill
                  </button>
                </>
              ) : (
                <>
                  <button type="button" role="menuitem" onClick={reportPost}>
                    <Flag aria-hidden="true" /> Report spill
                  </button>
                  <button type="button" role="menuitem" onClick={() => removePost(post.id)}>
                    <EyeOff aria-hidden="true" /> Hide spill
                  </button>
                  <button type="button" role="menuitem" onClick={() => muteAuthor(post.author)}>
                    <VolumeX aria-hidden="true" /> Mute @{post.author}
                  </button>
                  <button className={styles.dangerAction} type="button" role="menuitem" onClick={() => blockAuthor(post.author)}>
                    <UserRoundX aria-hidden="true" /> Block @{post.author}
                  </button>
                </>
              )}
            </div>
          ) : null}
        </header>

        {post.contentNote ? (
          <p className={styles.contentNote}><Flag aria-hidden="true" /> Content note: {post.contentNote}</p>
        ) : null}

        {editing ? (
          <div className={styles.editPanel}>
            <label className="sr-only" htmlFor={`edit-${post.id}`}>Edit spill</label>
            <textarea id={`edit-${post.id}`} value={draft} maxLength={500} onChange={(event) => setDraft(event.target.value)} />
            <div>
              <button type="button" onClick={() => { setDraft(post.content); setEditing(false); }}>Cancel</button>
              <button type="button" onClick={saveEdit} disabled={!draft.trim()}>Save changes</button>
            </div>
          </div>
        ) : (
          <Link className={styles.contentLink} href={postHref}>
            <p className={`${styles.content} display-type`}>{post.content}</p>
            {post.image ? (
              <span className={styles.imageFrame}>
                <Image
                  src={post.image}
                  alt="Attached photo"
                  fill
                  unoptimized={post.image.startsWith("data:")}
                  sizes="(max-width: 759px) calc(100vw - 88px), (max-width: 1179px) calc(100vw - 190px), 670px"
                />
              </span>
            ) : null}
          </Link>
        )}

        {post.poll ? (
          <fieldset className={styles.poll}>
            <legend className="sr-only">Vote in this poll</legend>
            {post.poll.options.map((option, index) => (
              <button
                type="button"
                key={option.label}
                className={post.poll?.selectedOption === index ? styles.pollSelected : ""}
                aria-pressed={post.poll?.selectedOption === index}
                disabled={post.poll?.selectedOption !== undefined}
                onClick={() => voteInPoll(post.id, index)}
              >
                <i style={{ width: `${option.percentage}%` }} aria-hidden="true" />
                <span>{option.label}</span>
                <strong>{option.percentage}%</strong>
              </button>
            ))}
            <small>{post.poll.votes} {post.poll.votes === 1 ? "vote" : "votes"}{post.poll.selectedOption !== undefined ? " · You voted" : ""}</small>
          </fieldset>
        ) : null}

        <footer className={styles.actions}>
          <button
            className={post.liked ? styles.liked : ""}
            type="button"
            aria-label={post.liked ? `Unlike. ${post.likes} likes` : `Like. ${post.likes} likes`}
            aria-pressed={post.liked}
            onClick={() => toggleLike(post.id)}
          >
            <Heart aria-hidden="true" fill={post.liked ? "currentColor" : "none"} />
            <span>{post.likes}</span>
          </button>
          <Link href={postHref} aria-label={`Read ${post.replies} replies`}>
            <MessageCircle aria-hidden="true" />
            <span>{post.replies}</span>
          </Link>
          <button
            className={post.saved ? styles.saved : ""}
            type="button"
            aria-label={post.saved ? "Remove from saved" : "Save spill"}
            aria-pressed={post.saved}
            onClick={() => toggleSaved(post.id)}
          >
            <Bookmark aria-hidden="true" fill={post.saved ? "currentColor" : "none"} />
            <span className={styles.actionLabel}>{post.saved ? "Saved" : "Save"}</span>
          </button>
          <button type="button" onClick={handleShare} aria-label="Share spill">
            <Share2 aria-hidden="true" />
            <span className={styles.actionLabel} aria-live="polite">
              {shareState === "idle" ? "Share" : shareState === "copied" ? "Copied" : "Shared"}
            </span>
          </button>
        </footer>
        {feedback ? <p className={styles.feedback} role="status">{feedback}</p> : null}
      </div>
    </article>
  );
}
