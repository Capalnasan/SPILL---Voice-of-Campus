import type { Metadata } from "next";
import { SavedView } from "@/features/saved/saved-view";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return <SavedView />;
}

