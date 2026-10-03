import type { Metadata } from "next";
import { PolicyShell, type PolicySection } from "../community-rules/policy-shell";

export const metadata: Metadata = {
  title: "Terms",
  description: "The straightforward terms for using Spill.",
};

const sections: PolicySection[] = [
  {
    id: "using-spill",
    title: "Using Spill",
    content: (
      <>
        <p>
          You must be at least 16, provide accurate account information, and keep your login
          secure. You are responsible for activity on your account and for following our
          Community Rules.
        </p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content stays yours",
    content: (
      <>
        <p>
          You keep ownership of what you post. You give Spill permission to host, display, and
          distribute that content only as needed to operate and improve the product. You can
          remove your content, subject to limited safety and legal retention.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>
          Do not misuse the service, interfere with its operation, scrape personal information,
          evade safety controls, or access another person’s account. Content and conduct must
          follow the Community Rules.
        </p>
      </>
    ),
  },
  {
    id: "moderation",
    title: "Moderation and account action",
    content: (
      <>
        <p>
          We may review, limit, or remove content and may restrict accounts when reasonably needed
          to protect the community or the service. We aim to apply these decisions consistently
          and provide notice when practical.
        </p>
      </>
    ),
  },
  {
    id: "service-changes",
    title: "Service changes",
    content: (
      <>
        <p>
          Spill will evolve. Features may change or be discontinued, and these terms may be
          updated. If a change materially affects your rights, we will provide reasonable notice.
          You can stop using Spill and request account deletion at any time.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Questions",
    content: (
      <p>
        Questions about these terms can be sent to <a href="mailto:legal@spill.example">legal@spill.example</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <PolicyShell
      title="The straightforward terms."
      description="A short agreement for using Spill responsibly—and a clear account of what you can expect from us."
      sections={sections}
    />
  );
}
