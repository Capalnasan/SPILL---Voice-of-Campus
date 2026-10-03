import { initialPosts } from "@/data/mock-data";
import type { Post } from "@/types/models";

const STORAGE_KEY = "spill.feed.v1";

export type RepositoryResult = { ok: true } | { ok: false; message: string };

export interface PostRepository {
  initial(): Post[];
  load(): Post[] | null;
  save(posts: Post[]): RepositoryResult;
}

function cloneSeedPosts() {
  return initialPosts.map((post) => ({
    ...post,
    poll: post.poll
      ? { ...post.poll, options: post.poll.options.map((option) => ({ ...option })) }
      : undefined,
  }));
}

export const localPostRepository: PostRepository = {
  initial: cloneSeedPosts,
  load() {
    if (typeof window === "undefined") return null;

    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);
      if (!rawValue) return null;
      const parsed = JSON.parse(rawValue) as { version?: number; posts?: Post[] };
      return parsed.version === 1 && Array.isArray(parsed.posts) ? parsed.posts : null;
    } catch {
      return null;
    }
  },
  save(posts) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, posts }));
      return { ok: true };
    } catch {
      return { ok: false, message: "Changes will last for this visit, but could not be saved locally." };
    }
  },
};
