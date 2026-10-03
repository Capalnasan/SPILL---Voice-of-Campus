"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { localPostRepository } from "@/repositories/post-repository";
import type { Post } from "@/types/models";

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
  activeTab: FeedTab;
  composerOpen: boolean;
  storageReady: boolean;
  notice: string;
  setActiveTab: (tab: FeedTab) => void;
  toggleLike: (postId: string) => void;
  toggleSaved: (postId: string) => void;
  addPost: (input: AddPostInput | string) => Post;
  updatePost: (postId: string, content: string) => void;
  removePost: (postId: string) => void;
  blockAuthor: (author: string) => void;
  muteAuthor: (author: string) => void;
  openComposer: () => void;
  closeComposer: () => void;
  showNotice: (message: string) => void;
};

const SpillContext = createContext<SpillContextValue | null>(null);

export function SpillProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(localPostRepository.initial);
  const [activeTab, setActiveTab] = useState<FeedTab>("for-you");
  const [composerOpen, setComposerOpen] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [notice, setNotice] = useState("");

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedPosts = localPostRepository.load();

      if (savedPosts) setPosts(savedPosts);
      setStorageReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    localPostRepository.save(posts);
  }, [posts, storageReady]);

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
  }, []);

  const toggleSaved = useCallback((postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post,
      ),
    );
  }, []);

  const addPost = useCallback((input: AddPostInput | string) => {
    const nextInput = typeof input === "string" ? { content: input } : input;
    const newPost: Post = {
      id: `spill-${Date.now()}`,
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
  }, [showNotice]);

  const updatePost = useCallback((postId: string, content: string) => {
    const nextContent = content.trim();
    if (!nextContent) return;
    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === postId ? { ...post, content: nextContent } : post)),
    );
  }, []);

  const removePost = useCallback((postId: string) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
  }, []);

  const blockAuthor = useCallback((author: string) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.author !== author));
  }, []);

  const muteAuthor = useCallback((author: string) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.author !== author));
  }, []);

  const openComposer = useCallback(() => setComposerOpen(true), []);
  const closeComposer = useCallback(() => setComposerOpen(false), []);

  const value = useMemo<SpillContextValue>(
    () => ({
      posts,
      activeTab,
      composerOpen,
      storageReady,
      notice,
      setActiveTab,
      toggleLike,
      toggleSaved,
      addPost,
      updatePost,
      removePost,
      blockAuthor,
      muteAuthor,
      openComposer,
      closeComposer,
      showNotice,
    }),
    [
      posts,
      activeTab,
      composerOpen,
      storageReady,
      notice,
      toggleLike,
      toggleSaved,
      addPost,
      updatePost,
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

