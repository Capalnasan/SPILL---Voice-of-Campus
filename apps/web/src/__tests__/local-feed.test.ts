import { beforeEach, describe, expect, it, vi } from "vitest";
import { localPostRepository } from "@/repositories/post-repository";

beforeEach(() => {
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe("Local feed persistence", () => {
  it("migrates the existing feed without losing posts or bookmarks", () => {
    const seed = localPostRepository.initial();
    const posts = [{ ...seed.posts[0], id: "spill-existing", saved: true, content: "My existing spill" }, ...seed.posts];
    window.localStorage.setItem("spill.feed.v1", JSON.stringify({ version: 1, posts }));
    const loaded = localPostRepository.load();
    expect(loaded?.posts[0]).toMatchObject({ id: "spill-existing", saved: true, replies: 0 });
    expect(loaded?.replies.every((reply) => reply.postId === "midnight-library")).toBe(true);
    expect(localPostRepository.save(loaded!)).toEqual({ ok: true });
    expect(window.localStorage.getItem("spill.feed.v1")).toBeNull();
    expect(localPostRepository.load()).toEqual(loaded);
  });

  it("rejects malformed stored resources instead of crashing the UI", () => {
    window.localStorage.setItem("spill.feed.v2", JSON.stringify({ version: 2, posts: [null], replies: [] }));
    expect(localPostRepository.load()).toBeNull();
    window.localStorage.setItem("spill.feed.v2", "not json");
    expect(localPostRepository.load()).toBeNull();
  });

  it("reports a storage failure while keeping the previous snapshot recoverable", () => {
    const state = localPostRepository.initial();
    window.localStorage.setItem("spill.feed.v1", JSON.stringify({ version: 1, posts: state.posts }));
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new DOMException("Quota exceeded", "QuotaExceededError"); });
    expect(localPostRepository.save(state).ok).toBe(false);
    expect(window.localStorage.getItem("spill.feed.v1")).not.toBeNull();
  });
});
