import type { Metadata } from "next";
import { ModerationView } from "@/features/admin/moderation-view";

export const metadata: Metadata = { title: "Moderation desk" };

export default function AdminPage() {
  return <ModerationView />;
}

