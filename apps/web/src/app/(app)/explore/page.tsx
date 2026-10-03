import type { Metadata } from "next";
import { ExploreView } from "@/features/explore/explore-view";

export const metadata: Metadata = {
  title: "Explore",
  description: "Find conversations, topics, and people on Spill.",
};

export default function ExplorePage() {
  return <ExploreView />;
}

