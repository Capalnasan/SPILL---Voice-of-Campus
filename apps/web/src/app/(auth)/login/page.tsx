import type { Metadata } from "next";
import { AuthForm } from "../auth-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Spill account and return to the conversation.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
