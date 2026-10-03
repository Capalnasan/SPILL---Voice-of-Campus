"use client";

import { Bookmark } from "lucide-react";
import { PostCard } from "@/components/app/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeading } from "@/components/ui/page-heading";
import { useSpill } from "@/providers/spill-provider";
import styles from "./saved-view.module.css";

export function SavedView() {
  const { posts } = useSpill();
  const savedPosts = posts.filter((post) => post.saved);

  return (
    <main>
      <PageHeading title="Saved" description="The thoughts you wanted to keep close, just for you." />
      <section aria-label="Saved spills" className={styles.list}>
        {savedPosts.length ? (
          savedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <EmptyState
            icon={<Bookmark size={28} aria-hidden="true" />}
            title="Nothing tucked away yet."
            description="Save any spill and it’ll wait for you here."
          />
        )}
      </section>
    </main>
  );
}
