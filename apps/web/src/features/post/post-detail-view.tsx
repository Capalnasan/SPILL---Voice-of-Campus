"use client";

import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, Flag, Heart, Reply as ReplyIcon, Send, Trash2, X } from "lucide-react";
import { PostCard } from "@/components/app/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { useSpill } from "@/providers/spill-provider";
import type { ConversationReply } from "@/types/models";
import styles from "./post-detail-view.module.css";

type ReplySort = "relevant" | "newest";

function orderThread(replies: ConversationReply[], sort: ReplySort) {
  const ids = new Set(replies.map((reply) => reply.id));
  const children = new Map<string, ConversationReply[]>();
  const roots: ConversationReply[] = [];
  for (const reply of replies) {
    if (reply.parentId && ids.has(reply.parentId)) {
      const group = children.get(reply.parentId) ?? [];
      group.push(reply);
      children.set(reply.parentId, group);
    } else roots.push(reply);
  }
  roots.sort((a, b) => sort === "newest"
    ? b.createdAt - a.createdAt
    : b.likes - a.likes || b.createdAt - a.createdAt);
  const ordered: Array<{ reply: ConversationReply; depth: number }> = [];
  const visited = new Set<string>();
  function visit(reply: ConversationReply, depth: number) {
    if (visited.has(reply.id)) return;
    visited.add(reply.id);
    ordered.push({ reply, depth: Math.min(depth, 3) });
    const descendants = children.get(reply.id) ?? [];
    descendants.sort((a, b) => a.createdAt - b.createdAt);
    for (const child of descendants) visit(child, depth + 1);
  }
  for (const root of roots) visit(root, 0);
  // Recover malformed/orphaned local threads instead of silently hiding replies.
  for (const reply of replies) visit(reply, 0);
  return ordered;
}

export function PostDetailView({ postId }: { postId: string }) {
  const { posts, replies, addReply, removeReply, toggleReplyLike, toggleSaved, showNotice, storageReady } = useSpill();
  const post = posts.find((candidate) => candidate.id === postId);
  const [reply, setReply] = useState("");
  const [sort, setSort] = useState<ReplySort>("relevant");
  const [targetId, setTargetId] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const target = replies.find((item) => item.id === targetId && item.postId === postId && !item.deleted);
  const conversation = replies.filter((item) => item.postId === postId);
  const ordered = orderThread(conversation, sort);
  const replyCount = conversation.filter((item) => !item.deleted).length;

  function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!addReply(postId, reply, target?.id)) return;
    setReply("");
    setTargetId(undefined);
    inputRef.current?.focus();
  }

  function startReply(item: ConversationReply) {
    setTargetId(item.id);
    inputRef.current?.focus();
  }

  function deleteReply(item: ConversationReply) {
    if (!window.confirm("Delete your reply? Replies beneath it will stay in the conversation.")) return;
    removeReply(item.id);
    if (targetId === item.id) setTargetId(undefined);
  }

  if (!storageReady) {
    return <div className={styles.loading} role="status" aria-label="Loading conversation"><i /><i /><i /></div>;
  }

  if (!post) {
    return (
      <div className={styles.missing}>
        <h1 className="display-type">This spill drifted away.</h1>
        <p>It may have been deleted, hidden, or isn’t available on this device.</p>
        <Link href="/feed">Back to the feed</Link>
      </div>
    );
  }

  return (
    <section className={styles.page} aria-label="Conversation">
      <header className={styles.header}>
        <Link href="/feed" aria-label="Back to feed"><ArrowLeft size={21} aria-hidden="true" /></Link>
        <h1 className="display-type">Replies</h1>
        <button type="button" aria-label={post.saved ? "Unsave conversation" : "Save conversation"}
          aria-pressed={post.saved} onClick={() => toggleSaved(postId)}>
          <Bookmark size={21} fill={post.saved ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </header>

      <section className={styles.original} aria-label="Original spill">
        <PostCard post={post} />
      </section>

      <div className={styles.sortRow}>
        <strong>{replyCount} {replyCount === 1 ? "reply" : "replies"}</strong>
        <label>
          <span className="sr-only">Sort replies</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as ReplySort)}>
            <option value="relevant">Most relevant</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
      </div>

      <section className={styles.thread} aria-label="Replies">
        {ordered.length === 0 ? (
          <EmptyState title="Be the first to reply." description="A little kindness can start a good conversation." />
        ) : ordered.map(({ reply: item, depth }) => (
          <article key={item.id} className={`${styles.reply} ${depth ? styles.nested : ""}`}
            style={{ "--reply-depth": depth } as CSSProperties} aria-label={`Reply by ${item.author}`}>
            <span className={`${styles.avatar} ${styles[item.avatarTone]}`} aria-hidden="true">
              {item.author.slice(0, 1).toUpperCase()}
            </span>
            <div className={styles.replyBody}>
              <header>
                <strong>{item.deleted ? "Deleted reply" : item.author}</strong>
                <time>{item.time}</time>
                {!item.deleted ? (
                  item.author === "sunflower" ? (
                    <button type="button" aria-label="Delete your reply" onClick={() => deleteReply(item)}>
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="button" aria-label={`Report reply by ${item.author}`}
                      onClick={() => showNotice("Reply report noted for this preview. Thanks for looking out for the community.")}>
                      <Flag size={16} aria-hidden="true" />
                    </button>
                  )
                ) : null}
              </header>
              <p className={item.deleted ? styles.deleted : undefined}>{item.deleted ? "This reply was deleted." : item.content}</p>
              {!item.deleted ? (
                <div className={styles.replyActions}>
                  <button type="button" className={item.liked ? styles.liked : ""}
                    aria-label={item.liked ? `Unlike reply. ${item.likes} likes` : `Like reply. ${item.likes} likes`}
                    aria-pressed={item.liked} onClick={() => toggleReplyLike(item.id)}>
                    <Heart size={16} fill={item.liked ? "currentColor" : "none"} aria-hidden="true" />
                    {item.likes}
                  </button>
                  <button type="button" aria-label={`Reply to ${item.author}`} onClick={() => startReply(item)}>
                    <ReplyIcon size={15} aria-hidden="true" /> Reply
                  </button>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <form className={styles.replyComposer} onSubmit={submitReply}>
        {target ? (
          <div className={styles.replyTarget}>
            <span>Replying to <strong>@{target.author}</strong></span>
            <button type="button" aria-label="Cancel reply to person" onClick={() => setTargetId(undefined)}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        ) : null}
        <span className={`${styles.avatar} ${styles.lime}`} aria-hidden="true">S</span>
        <label>
          <span className="sr-only">Write a reply</span>
          <input ref={inputRef} value={reply} onChange={(event) => setReply(event.target.value)}
            placeholder={target ? `Reply to @${target.author}…` : "Write a reply…"} maxLength={280} />
        </label>
        <button type="submit" aria-label="Send reply" disabled={!reply.trim()}>
          <Send size={18} aria-hidden="true" />
        </button>
        <div className={styles.composerHint}><span>Keep it kind. Keep it real.</span><span>{reply.length}/280</span></div>
      </form>
    </section>
  );
}

