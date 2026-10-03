"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { PostCard } from "@/components/app/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { useSpill, type FeedTab } from "@/providers/spill-provider";
import { QuickComposer } from "./quick-composer";
import styles from "./feed-view.module.css";

const tabs: Array<{ id: FeedTab; label: string }> = [
  { id: "for-you", label: "For you" },
  { id: "fresh", label: "Fresh" },
  { id: "following", label: "Following" },
];

const followingAuthors = new Set(["midnightlibrary", "northstar", "sunnysideup"]);

export function FeedView() {
  const { activeTab, posts, setActiveTab, storageReady } = useSpill();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());

  const visiblePosts = useMemo(() => {
    const tabPosts = activeTab === "following"
      ? posts.filter((post) => followingAuthors.has(post.author))
      : posts;

    if (!deferredQuery) {
      return tabPosts;
    }

    return tabPosts.filter((post) =>
      `${post.author} ${post.topic} ${post.content}`.toLocaleLowerCase().includes(deferredQuery),
    );
  }, [activeTab, deferredQuery, posts]);

  return (
    <section className={styles.feed} aria-labelledby="feed-title">
      <div className={styles.headingRow}>
        <h1 className="display-type" id="feed-title">Home</h1>
        <label className={styles.search}>
          <Search aria-hidden="true" />
          <span className="sr-only">Search spills, topics, or people</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search spills, topics, or people…"
          />
        </label>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Feed filters">
        {tabs.map((tab) => (
          <button
            id={`feed-tab-${tab.id}`}
            type="button"
            role="tab"
            key={tab.id}
            aria-selected={activeTab === tab.id}
            aria-controls="feed-posts"
            className={activeTab === tab.id ? styles.activeTab : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <QuickComposer />

      <div
        className={styles.posts}
        id="feed-posts"
        role="tabpanel"
        aria-labelledby={`feed-tab-${activeTab}`}
      >
        {!storageReady ? (
          <div className={styles.skeletons} aria-label="Loading spills" aria-busy="true">
            {[0, 1, 2].map((item) => (
              <div className={styles.skeleton} key={item}>
                <i /><span><b /><b /><b /></span>
              </div>
            ))}
          </div>
        ) : visiblePosts.length > 0 ? (
          visiblePosts.map((post) => <PostCard post={post} key={post.id} />)
        ) : (
          <EmptyState title="Nothing spilled here yet." description="Try another search or feed." />
        )}
      </div>
    </section>
  );
}

