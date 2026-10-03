"use client";

import { BarChart3, Image as ImageIcon, VenetianMask } from "lucide-react";
import { useState } from "react";
import { useSpill } from "@/providers/spill-provider";
import { Avatar } from "@/components/app/avatar";
import styles from "./quick-composer.module.css";

export function QuickComposer() {
  const { openComposer } = useSpill();
  const [anonymous, setAnonymous] = useState(true);

  return (
    <section className={styles.composer} aria-label="Create a spill">
      <div className={styles.promptRow}>
        <Avatar avatar="ghost" avatarTone="violet" size="medium" />
        <button type="button" className={`${styles.prompt} display-type`} onClick={openComposer}>
          What’s on your mind?
        </button>
      </div>
      <div className={styles.tools}>
        <button type="button" onClick={openComposer}>
          <ImageIcon aria-hidden="true" />
          <span>Add photo</span>
        </button>
        <button type="button" onClick={openComposer}>
          <BarChart3 aria-hidden="true" />
          <span>Create poll</span>
        </button>
        <button
          className={styles.anonymous}
          type="button"
          role="switch"
          aria-checked={anonymous}
          onClick={() => setAnonymous((current) => !current)}
        >
          <i className={anonymous ? styles.switchOn : ""} aria-hidden="true"><b /></i>
          <VenetianMask aria-hidden="true" />
          <span><strong>Post anonymously</strong><small>Your identity stays hidden</small></span>
        </button>
        <button className={styles.post} type="button" onClick={openComposer}>Post</button>
      </div>
    </section>
  );
}

