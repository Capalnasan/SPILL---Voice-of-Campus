import type { Metadata } from "next";
import { PolicyShell, type PolicySection } from "../community-rules/policy-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Spill handles your information and protects your pseudonymous identity.",
};

const sections: PolicySection[] = [
  {
    id: "what-we-collect",
    title: "What we collect",
    content: (
      <>
        <p>
          We collect the account details you provide, the posts and replies you create, and basic
          technical information needed to run and protect the service. This can include device,
          browser, and security log information.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    content: (
      <>
        <p>
          We use information to operate Spill, personalize your feed, prevent abuse, respond to
          reports, and understand whether the product is working well. We do not sell your
          personal information.
        </p>
      </>
    ),
  },
  {
    id: "pseudonymity",
    title: "Pseudonymity and identity",
    content: (
      <>
        <p>
          Your pseudonym is public; your account email is not. Pseudonymity is not a promise of
          absolute anonymity: authorized team members may access limited account information for
          security, legal, or moderation reasons.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "When information is shared",
    content: (
      <>
        <p>
          We share only what is needed with service providers that help us host, secure, and
          maintain Spill. We may also disclose information when required by law or when necessary
          to protect someone from serious harm.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    content: (
      <>
        <p>
          You can edit or remove your posts, adjust feed and privacy settings, and request access
          to or deletion of your account information. Some records may be retained briefly for
          security, dispute, or legal obligations.
        </p>
        <p>
          Privacy questions can be sent to <a href="mailto:privacy@spill.example">privacy@spill.example</a>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PolicyShell
      title="Privacy should feel clear."
      description="Your trust matters more than data collection. Here is the short, plain-language version of what Spill knows and why."
      sections={sections}
    />
  );
}
