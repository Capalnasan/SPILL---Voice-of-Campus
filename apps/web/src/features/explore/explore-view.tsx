"use client";

import { useDeferredValue, useState } from "react";
import { ArrowUpRight, Search, Sparkles, TrendingUp } from "lucide-react";
import { PostCard } from "@/components/app/post-card";
import { PageHeading } from "@/components/ui/page-heading";
import { trendingTopics } from "@/data/mock-data";
import { useSpill } from "@/providers/spill-provider";
import styles from "./explore-view.module.css";

const communities = [
  { name: "Campus life", members: "12.8k voices", tone: "coral" },
  { name: "Small wins", members: "8.2k voices", tone: "lime" },
  { name: "Unsent thoughts", members: "6.7k voices", tone: "violet" },
];

export function ExploreView() {
  const { posts } = useSpill();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const results = deferredQuery
    ? posts.filter((post) =>
        `${post.author} ${post.topic} ${post.content}`.toLowerCase().includes(deferredQuery),
      )
    : posts.slice(0, 2);

  return (
    <main>
      <PageHeading
        title="Explore"
        description="Follow a thought, find your people, or wander somewhere unexpected."
      />

      <div className={styles.content}>
        <label className={styles.search}>
          <Search size={21} aria-hidden="true" />
          <span className="sr-only">Search Spill</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search spills, topics, or people…"
          />
          <kbd>/</kbd>
        </label>

        {deferredQuery ? (
          <section aria-labelledby="search-results" className={styles.results}>
            <div className={styles.sectionTitleRow}>
              <h2 id="search-results">Results for “{query}”</h2>
              <span>{results.length} found</span>
            </div>
            {results.length ? (
              results.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className={styles.empty}>
                <Sparkles size={26} aria-hidden="true" />
                <h3>No spills found yet.</h3>
                <p>Try a topic like “campus life” or a softer keyword.</p>
              </div>
            )}
          </section>
        ) : (
          <>
            <section aria-labelledby="trending-title" className={styles.trending}>
              <div className={styles.sectionTitleRow}>
                <h2 id="trending-title">Happening now</h2>
                <TrendingUp size={21} aria-hidden="true" />
              </div>
              <div className={styles.topicList}>
                {trendingTopics.map((topic, index) => (
                  <button type="button" key={topic.label} className={styles.topic}>
                    <span className={styles.topicIndex}>0{index + 1}</span>
                    <span>
                      <strong>{topic.label}</strong>
                      <small>{topic.count}</small>
                    </span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            <section aria-labelledby="communities-title" className={styles.communities}>
              <div className={styles.sectionTitleRow}>
                <h2 id="communities-title">Find your corner</h2>
                <span>Communities for every kind of day</span>
              </div>
              <div className={styles.communityGrid}>
                {communities.map((community) => (
                  <button type="button" key={community.name} className={styles.community}>
                    <span className={`${styles.swatch} ${styles[community.tone]}`} />
                    <strong>{community.name}</strong>
                    <small>{community.members}</small>
                    <span className={styles.join}>Explore</span>
                  </button>
                ))}
              </div>
            </section>

            <section aria-labelledby="conversation-title" className={styles.results}>
              <div className={styles.sectionTitleRow}>
                <h2 id="conversation-title">Conversations worth joining</h2>
                <span>Fresh from your campus</span>
              </div>
              {results.map((post) => <PostCard key={post.id} post={post} />)}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

