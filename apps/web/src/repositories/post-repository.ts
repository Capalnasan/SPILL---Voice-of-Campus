import { initialPosts, initialReplies } from "@/data/mock-data";
import type { ConversationReply, LocalProfile, Post } from "@/types/models";

const STORAGE_KEY = "spill.feed.v2";
const LEGACY_STORAGE_KEY = "spill.feed.v1";

export type RepositoryResult = { ok: true } | { ok: false; message: string };
export type LocalFeedState = { posts: Post[]; replies: ConversationReply[]; profile: LocalProfile };

export interface PostRepository {
  initial(): LocalFeedState;
  load(): LocalFeedState | null;
  save(state: LocalFeedState): RepositoryResult;
}

const defaultProfile: LocalProfile = {
  displayName: "sunflower",
  bio: "finding tiny bright spots between deadlines.",
};

function seedReplies(): ConversationReply[] {
  return initialReplies.map((reply, index) => ({
    ...reply,
    postId: "midnight-library",
    parentId: reply.depth ? initialReplies[index - 1].id : undefined,
    createdAt: index,
    liked: false,
  }));
}

function withReplyCounts(posts: Post[], replies: ConversationReply[]) {
  const counts = new Map<string, number>();
  for (const reply of replies) {
    if (!reply.deleted) counts.set(reply.postId, (counts.get(reply.postId) ?? 0) + 1);
  }
  return posts.map((post) => ({ ...post, replies: counts.get(post.id) ?? 0 }));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCount(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isPost(value: unknown): value is Post {
  if (!isRecord(value)) return false;
  const valid = ["id", "author", "time", "content"].every((key) => typeof value[key] === "string")
    && ["campus life", "relationships", "small wins", "questions"].includes(String(value.topic))
    && ["moon", "flower", "star", "ghost", "spark"].includes(String(value.avatar))
    && ["violet", "pink", "lime", "coral", "blue"].includes(String(value.avatarTone))
    && isCount(value.likes) && isCount(value.replies)
    && typeof value.liked === "boolean" && typeof value.saved === "boolean"
    && (value.anonymous === undefined || typeof value.anonymous === "boolean")
    && (value.image === undefined || typeof value.image === "string")
    && (value.contentNote === undefined || typeof value.contentNote === "string");
  if (!valid) return false;
  if (value.poll === undefined) return true;
  const poll = value.poll;
  return isRecord(poll) && isCount(poll.votes) && Array.isArray(poll.options)
    && poll.options.length >= 2 && poll.options.length <= 4
    && poll.options.every((option: unknown) => isRecord(option)
      && typeof option.label === "string" && isCount(option.percentage) && option.percentage <= 100
      && (option.votes === undefined || isCount(option.votes)))
    && (poll.selectedOption === undefined || (Number.isInteger(poll.selectedOption)
      && Number(poll.selectedOption) >= 0 && Number(poll.selectedOption) < poll.options.length));
}

function isReply(value: unknown): value is ConversationReply {
  return isRecord(value)
    && ["id", "postId", "author", "time", "content"].every((key) => typeof value[key] === "string")
    && (value.parentId === undefined || typeof value.parentId === "string")
    && isCount(value.likes) && isCount(value.depth) && isCount(value.createdAt)
    && typeof value.liked === "boolean"
    && (value.deleted === undefined || typeof value.deleted === "boolean")
    && ["moon", "flower", "star", "ghost", "spark"].includes(String(value.avatar))
    && ["violet", "pink", "lime", "coral", "blue"].includes(String(value.avatarTone));
}

function normalize(posts: Post[], replies: ConversationReply[], profile: LocalProfile): LocalFeedState {
  const postIds = new Set(posts.map((post) => post.id));
  const validReplies = replies.filter((reply) => postIds.has(reply.postId));
  return { posts: withReplyCounts(posts, validReplies), replies: validReplies, profile };
}

export const localPostRepository: PostRepository = {
  initial() {
    const posts = initialPosts.map((post) => ({
      ...post,
      poll: post.poll ? { ...post.poll, options: post.poll.options.map((option) => ({ ...option })) } : undefined,
    }));
    return normalize(posts, seedReplies(), { ...defaultProfile });
  },
  load() {
    if (typeof window === "undefined") return null;

    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);
      if (rawValue) {
        const parsed: unknown = JSON.parse(rawValue);
        if (!isRecord(parsed) || parsed.version !== 2 || !Array.isArray(parsed.posts)
          || !parsed.posts.every(isPost) || !Array.isArray(parsed.replies) || !parsed.replies.every(isReply)) return null;
        const profile = isRecord(parsed.profile) && typeof parsed.profile.displayName === "string"
          && parsed.profile.displayName.trim().length > 0 && typeof parsed.profile.bio === "string"
          ? { displayName: parsed.profile.displayName.slice(0, 40), bio: parsed.profile.bio.slice(0, 160) }
          : { ...defaultProfile };
        return normalize(parsed.posts, parsed.replies, profile);
      }
      const legacyValue = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!legacyValue) return null;
      const legacy: unknown = JSON.parse(legacyValue);
      return isRecord(legacy) && legacy.version === 1 && Array.isArray(legacy.posts) && legacy.posts.every(isPost)
        ? normalize(legacy.posts, seedReplies(), { ...defaultProfile }) : null;
    } catch {
      return null;
    }
  },
  save(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, ...state }));
      // Remove the old copy only after the new snapshot has been saved successfully.
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return { ok: true };
    } catch {
      return { ok: false, message: "Changes will last for this visit, but could not be saved on this device." };
    }
  },
};
