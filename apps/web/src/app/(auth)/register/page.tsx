import type { Metadata } from "next";
import { AuthForm } from "../auth-form";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create a pseudonymous Spill profile and find your community.",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
