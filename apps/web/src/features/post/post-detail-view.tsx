"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, MoreHorizontal, Reply as ReplyIcon, Send } from "lucide-react";
import { PostCard } from "@/components/app/post-card";
import { initialReplies } from "@/data/mock-data";
import { useSpill } from "@/providers/spill-provider";
import type { Reply } from "@/types/models";
import styles from "./post-detail-view.module.css";

export function PostDetailView({ postId }: { postId: string }) {
  const { posts, showNotice } = useSpill();
  const post = posts.find((candidate) => candidate.id === postId) ?? posts[0];
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [reply, setReply] = useState("");
  const [likedReplies, setLikedReplies] = useState<Set<string>>(() => new Set());

  function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = reply.trim();
    if (!content) return;
    setReplies((items) => [
      ...items,
      {
        id: `local-reply-${Date.now()}`,
        author: "sunflower",
        time: "now",
        content,
        likes: 0,
        depth: 0,
        avatar: "spark",
        avatarTone: "lime",
      },
    ]);
    setReply("");
    showNotice("Reply added to the conversation.");
  }

  function toggleReplyLike(replyId: string) {
    setLikedReplies((current) => {
      const next = new Set(current);
      if (next.has(replyId)) next.delete(replyId);
      else next.add(replyId);
      return next;
    });
  }

  if (!post) {
    return (
      <main className={styles.missing}>
        <h1 className="display-type">This spill drifted away.</h1>
        <Link href="/feed">Back to the feed</Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/feed" aria-label="Back to feed"><ArrowLeft size={21} aria-hidden="true" /></Link>
        <h1 className="display-type">Replies</h1>
        <button type="button" aria-label="More conversation options"><MoreHorizontal size={22} /></button>
      </header>

      <section className={styles.original} aria-label="Original spill">
        <PostCard post={post} />
      </section>

      <div className={styles.sortRow}>
        <strong>{replies.length} replies</strong>
        <button type="button">Most relevant <span aria-hidden="true">⌄</span></button>
      </div>

      <section className={styles.thread} aria-label="Replies">
        {replies.map((item) => {
          const liked = likedReplies.has(item.id);
          return (
            <article key={item.id} className={`${styles.reply} ${item.depth ? styles.nested : ""}`}>
              <span className={`${styles.avatar} ${styles[item.avatarTone]}`} aria-hidden="true">
                {item.author.slice(0, 1).toUpperCase()}
              </span>
              <div className={styles.replyBody}>
                <header>
                  <strong>{item.author}</strong>
                  <time>{item.time}</time>
                  <button type="button" aria-label={`More options for ${item.author}'s reply`}><MoreHorizontal size={17} /></button>
                </header>
                <p>{item.content}</p>
                <div className={styles.replyActions}>
                  <button
                    type="button"
                    className={liked ? styles.liked : ""}
                    aria-pressed={liked}
                    onClick={() => toggleReplyLike(item.id)}
                  >
                    <Heart size={16} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
                    {item.likes + (liked ? 1 : 0)}
                  </button>
                  <button type="button"><ReplyIcon size={15} aria-hidden="true" /> Reply</button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <form className={styles.replyComposer} onSubmit={submitReply}>
        <span className={`${styles.avatar} ${styles.lime}`} aria-hidden="true">S</span>
        <label>
          <span className="sr-only">Write a reply</span>
          <input
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            placeholder="Write a reply…"
            maxLength={280}
          />
        </label>
        <button type="submit" aria-label="Send reply" disabled={!reply.trim()}>
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
    </main>
  );
}

