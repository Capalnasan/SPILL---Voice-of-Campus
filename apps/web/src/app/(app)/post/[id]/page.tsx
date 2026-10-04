import type { Metadata } from "next";
import { PostDetailView } from "@/features/post/post-detail-view";

export const metadata: Metadata = { title: "Replies" };

type PostPageProps = { params: Promise<{ id: string }> };

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  return <PostDetailView key={id} postId={id} />;
}

