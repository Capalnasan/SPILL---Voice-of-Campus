import type { Metadata } from "next";
import { FeedView } from "@/features/feed/feed-view";

export const metadata: Metadata = {
  title: "Home",
  description: "Your Spill community feed.",
};

export default function FeedPage() {
  return <FeedView />;
}

