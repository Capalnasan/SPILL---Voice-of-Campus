"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { localPostRepository } from "@/repositories/post-repository";
import {
  defaultPreferences,
  localActivityRepository,
  localPreferencesRepository,
  seedActivity,
} from "@/repositories/local-preferences-repository";
import type { ActivityItem, ConversationReply, LocalProfile, Post, SpillPreferences } from "@/types/models";

export type FeedTab = "for-you" | "fresh" | "following";

export type AddPostInput = {
  content: string;
  anonymous?: boolean;
  image?: string;
  contentNote?: string;
  pollOptions?: string[];
};

type SpillContextValue = {
  posts: Post[];
  replies: ConversationReply[];
  profile: LocalProfile;
  preferences: SpillPreferences;
  activity: ActivityItem[];
  unreadActivityCount: number;
  storageError: string;
  activeTab: FeedTab;
  composerOpen: boolean;
  storageReady: boolean;
  notice: string;
  setActiveTab: (tab: FeedTab) => void;
  toggleLike: (postId: string) => void;
  toggleSaved: (postId: string) => void;
  addPost: (input: AddPostInput | string) => Post;
  updatePost: (postId: string, content: string) => void;
  voteInPoll: (postId: string, optionIndex: number) => void;
  addReply: (postId: string, content: string, parentId?: string) => boolean;
  toggleReplyLike: (replyId: string) => void;
  removeReply: (replyId: string) => void;
  updateProfile: (profile: LocalProfile) => void;
  updatePreference: <Key extends keyof SpillPreferences>(key: Key, value: SpillPreferences[Key]) => void;
  markActivityRead: (activityId: string) => void;
  markAllActivityRead: () => void;
  removePost: (postId: string) => void;
  blockAuthor: (author: string) => void;
  muteAuthor: (author: string) => void;
  openComposer: () => void;
  closeComposer: () => void;
  showNotice: (message: string) => void;
};

const SpillContext = createContext<SpillContextValue | null>(null);

export function SpillProvider({ children }: { children: ReactNode }) {
  const [feedState, setFeedState] = useState(localPostRepository.initial);
  const { posts, replies, profile } = feedState;
  const [storageError, setStorageError] = useState("");
  const [preferences, setPreferences] = useState<SpillPreferences>(defaultPreferences);
  const [activity, setActivity] = useState<ActivityItem[]>(seedActivity);
  const noticeTimer = useRef<number | null>(null);
  const setPosts = useCallback((update: (posts: Post[]) => Post[]) => {
    setFeedState((current) => ({ ...current, posts: update(current.posts) }));
  }, []);
  const [activeTab, setActiveTab] = useState<FeedTab>("for-you");
  const [composerOpen, setComposerOpen] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [notice, setNotice] = useState("");

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 2400);
  }, []);

  useEffect(() => () => {
    if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedState = localPostRepository.load();

      if (savedState) setFeedState(savedState);
      setPreferences(localPreferencesRepository.load());
      setActivity(localActivityRepository.load());
      setStorageReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    const result = localPostRepository.save(feedState);
    const frame = window.requestAnimationFrame(() => setStorageError(result.ok ? "" : result.message));
    return () => window.cancelAnimationFrame(frame);
  }, [feedState, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    const preferencesResult = localPreferencesRepository.save(preferences);
    const activityResult = localActivityRepository.save(activity);
    const failed = [preferencesResult, activityResult].find((result) => !result.ok);
    const frame = window.requestAnimationFrame(() => setStorageError(failed && !failed.ok ? failed.message : ""));
    return () => window.cancelAnimationFrame(frame);
  }, [activity, preferences, storageReady]);

  const toggleLike = useCallback((postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: Math.max(0, post.likes + (post.liked ? -1 : 1)),
            }
          : post,
      ),
    );
  }, [setPosts]);

  const toggleSaved = useCallback((postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post,
      ),
    );
  }, [setPosts]);

  const addPost = useCallback((input: AddPostInput | string) => {
    const nextInput = typeof input === "string" ? { content: input } : input;
    const newPost: Post = {
      id: `spill-${crypto.randomUUID()}`,
      author: nextInput.anonymous ? "anonymous" : "sunflower",
      time: "now",
      topic: "campus life",
      content: nextInput.content.trim(),
      likes: 0,
      replies: 0,
      liked: false,
      saved: false,
      anonymous: nextInput.anonymous,
      image: nextInput.image,
      contentNote: nextInput.contentNote?.trim() || undefined,
      poll: nextInput.pollOptions?.length
        ? {
            options: nextInput.pollOptions.map((label) => ({ label, percentage: 0 })),
            votes: 0,
          }
        : undefined,
      avatar: nextInput.anonymous ? "ghost" : "spark",
      avatarTone: nextInput.anonymous ? "violet" : "lime",
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setActiveTab("for-you");
    showNotice("Your spill is live.");
    return newPost;
  }, [setPosts, showNotice]);

  const updatePost = useCallback((postId: string, content: string) => {
    const nextContent = content.trim();
    if (!nextContent) return;
    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === postId ? { ...post, content: nextContent } : post)),
    );
  }, [setPosts]);

  const voteInPoll = useCallback((postId: string, optionIndex: number) => {
    setPosts((current) => current.map((post) => {
      const poll = post.poll;
      if (post.id !== postId || !poll || poll.selectedOption !== undefined
        || !Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= poll.options.length) return post;
      // Convert the fixture percentages to counts once; subsequent votes use exact counts.
      const counts = poll.options.map((option) => option.votes ?? Math.round(option.percentage * poll.votes / 100));
      const roundingDifference = poll.votes - counts.reduce((sum, count) => sum + count, 0);
      const largestIndex = counts.indexOf(Math.max(...counts));
      counts[largestIndex] += roundingDifference;
      counts[optionIndex] += 1;
      const votes = poll.votes + 1;
      const percentages = counts.map((count) => Math.floor(count * 100 / votes));
      const byRemainder = counts.map((count, index) => ({ index, remainder: (count * 100 / votes) % 1 }))
        .sort((a, b) => b.remainder - a.remainder);
      const missing = 100 - percentages.reduce((sum, percentage) => sum + percentage, 0);
      for (let index = 0; index < missing; index += 1) percentages[byRemainder[index].index] += 1;
      return { ...post, poll: { votes, selectedOption: optionIndex,
        options: poll.options.map((option, index) => ({ ...option, votes: counts[index], percentage: percentages[index] })) } };
    }));
  }, [setPosts]);

  const addReply = useCallback((postId: string, content: string, parentId?: string) => {
    const text = content.trim();
    const parent = parentId ? replies.find((item) => item.id === parentId && item.postId === postId && !item.deleted) : undefined;
    if (!storageReady || !text || text.length > 280 || !posts.some((post) => post.id === postId) || (parentId && !parent)) return false;
    const reply: ConversationReply = {
      id: `reply-${crypto.randomUUID()}`, postId, parentId, content: text,
      author: "sunflower", time: "now", likes: 0, liked: false,
      depth: parent ? Math.min(parent.depth + 1, 3) : 0,
      createdAt: Date.now(), avatar: "spark", avatarTone: "lime",
    };
    setFeedState((current) => ({ ...current,
      replies: [...current.replies, reply],
      posts: current.posts.map((post) => post.id === postId ? { ...post, replies: post.replies + 1 } : post),
    }));
    showNotice("Reply added to the conversation.");
    return true;
  }, [posts, replies, showNotice, storageReady]);

  const toggleReplyLike = useCallback((replyId: string) => {
    setFeedState((current) => ({ ...current,
      replies: current.replies.map((reply) => reply.id === replyId && !reply.deleted
        ? { ...reply, liked: !reply.liked, likes: Math.max(0, reply.likes + (reply.liked ? -1 : 1)) } : reply),
    }));
  }, []);

  const removeReply = useCallback((replyId: string) => {
    setFeedState((current) => {
      const reply = current.replies.find((item) => item.id === replyId);
      if (!reply || reply.author !== "sunflower" || reply.deleted) return current;
      return { ...current,
        replies: current.replies.map((item) => item.id === replyId
          ? { ...item, deleted: true, content: "", liked: false, likes: 0 } : item),
        posts: current.posts.map((post) => post.id === reply.postId
          ? { ...post, replies: Math.max(0, post.replies - 1) } : post),
      };
    });
    showNotice("Your reply was deleted.");
  }, [showNotice]);

  const updateProfile = useCallback((next: LocalProfile) => {
    if (!next.displayName.trim()) return;
    setFeedState((current) => ({ ...current,
      profile: { displayName: next.displayName.trim().slice(0, 40), bio: next.bio.trim().slice(0, 160) },
    }));
    showNotice("Your profile was updated.");
  }, [showNotice]);

  const updatePreference = useCallback(<Key extends keyof SpillPreferences>(key: Key, nextValue: SpillPreferences[Key]) => {
    setPreferences((current) => ({ ...current, [key]: nextValue }));
    showNotice("Preference saved.");
  }, [showNotice]);

  const markActivityRead = useCallback((activityId: string) => {
    setActivity((items) => items.map((item) => item.id === activityId ? { ...item, unread: false } : item));
  }, []);

  const markAllActivityRead = useCallback(() => {
    setActivity((items) => items.map((item) => item.unread ? { ...item, unread: false } : item));
    showNotice("All activity marked as read.");
  }, [showNotice]);

  const removePost = useCallback((postId: string) => {
    setFeedState((current) => ({ ...current,
      posts: current.posts.filter((post) => post.id !== postId),
      replies: current.replies.filter((reply) => reply.postId !== postId),
    }));
  }, []);

  const blockAuthor = useCallback((author: string) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.author !== author));
  }, [setPosts]);

  const muteAuthor = useCallback((author: string) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.author !== author));
  }, [setPosts]);

  const openComposer = useCallback(() => setComposerOpen(true), []);
  const closeComposer = useCallback(() => setComposerOpen(false), []);

  const value = useMemo<SpillContextValue>(
    () => ({
      posts,
      replies,
      profile,
      preferences,
      activity,
      unreadActivityCount: activity.filter((item) => item.unread).length,
      storageError,
      activeTab,
      composerOpen,
      storageReady,
      notice,
      setActiveTab,
      toggleLike,
      toggleSaved,
      addPost,
      updatePost,
      voteInPoll,
      addReply,
      toggleReplyLike,
      removeReply,
      updateProfile,
      updatePreference,
      markActivityRead,
      markAllActivityRead,
      removePost,
      blockAuthor,
      muteAuthor,
      openComposer,
      closeComposer,
      showNotice,
    }),
    [
      posts,
      replies,
      profile,
      preferences,
      activity,
      storageError,
      activeTab,
      composerOpen,
      storageReady,
      notice,
      toggleLike,
      toggleSaved,
      addPost,
      updatePost,
      voteInPoll,
      addReply,
      toggleReplyLike,
      removeReply,
      updateProfile,
      updatePreference,
      markActivityRead,
      markAllActivityRead,
      removePost,
      blockAuthor,
      muteAuthor,
      openComposer,
      closeComposer,
      showNotice,
    ],
  );

  return <SpillContext.Provider value={value}>{children}</SpillContext.Provider>;
}

export function useSpill() {
  const context = useContext(SpillContext);

  if (!context) {
    throw new Error("useSpill must be used inside SpillProvider");
  }

  return context;
}

