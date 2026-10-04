export type Topic = "campus life" | "relationships" | "small wins" | "questions";

export type Post = {
  id: string;
  author: string;
  time: string;
  topic: Topic;
  content: string;
  likes: number;
  replies: number;
  liked: boolean;
  saved: boolean;
  anonymous?: boolean;
  image?: string;
  contentNote?: string;
  poll?: {
    options: Array<{ label: string; percentage: number; votes?: number }>;
    votes: number;
    selectedOption?: number;
  };
  avatar: "moon" | "flower" | "star" | "ghost" | "spark";
  avatarTone: "violet" | "pink" | "lime" | "coral" | "blue";
};

export type Reply = {
  id: string;
  author: string;
  time: string;
  content: string;
  likes: number;
  depth: number;
  avatar: Post["avatar"];
  avatarTone: Post["avatarTone"];
};

export type ConversationReply = Reply & {
  postId: string;
  parentId?: string;
  createdAt: number;
  liked: boolean;
  deleted?: boolean;
};

export type LocalProfile = {
  displayName: string;
  bio: string;
};

