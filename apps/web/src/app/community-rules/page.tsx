import type { Metadata } from "next";
import { PolicyShell, type PolicySection } from "./policy-shell";
import styles from "./policy.module.css";

export const metadata: Metadata = {
  title: "Community rules",
  description: "The simple standards that keep Spill honest, safe, and human.",
};

const sections: PolicySection[] = [
  {
    id: "be-human",
    title: "Be honest. Be human.",
    content: (
      <>
        <p>
          Share what is real for you, without turning someone else into a target. Disagreement
          belongs here; humiliation, threats, and hate do not.
        </p>
        <ul>
          <li>Challenge ideas without attacking the person behind them.</li>
          <li>Do not encourage harm or single someone out for abuse.</li>
          <li>Never use slurs or dehumanizing language.</li>
        </ul>
      </>
    ),
  },
  {
    id: "protect-privacy",
    title: "Protect people’s privacy.",
    content: (
      <>
        <p>
          Pseudonymity makes room for honesty. Do not reveal, request, or threaten to reveal
          someone’s identity or private information without clear permission.
        </p>
        <ul>
          <li>No doxxing, impersonation, or sharing private messages to shame someone.</li>
          <li>Remove names and identifying details when telling a story about another person.</li>
        </ul>
      </>
    ),
  },
  {
    id: "keep-it-safe",
    title: "Keep the space safe.",
    content: (
      <>
        <p>
          Do not post sexual exploitation, graphic violence, scams, or instructions that put
          people in immediate danger. If someone may be at risk, report the post so it can be
          reviewed quickly.
        </p>
      </>
    ),
  },
  {
    id: "participate-genuinely",
    title: "Participate genuinely.",
    content: (
      <>
        <p>
          Do not use Spill for spam, coordinated manipulation, fake engagement, or repetitive
          promotion. Give conversations room to breathe and post in good faith.
        </p>
      </>
    ),
  },
  {
    id: "how-moderation-works",
    title: "How moderation works.",
    content: (
      <>
        <p>
          We consider context, severity, and repeated behavior. Depending on the situation, we
          may limit a post, remove content, restrict an account, or suspend access. People can
          report content from the post menu and will be able to appeal account-level decisions.
        </p>
      </>
    ),
  },
];

export default function CommunityRulesPage() {
  return (
    <PolicyShell
      title="Keep it real. Keep it kind."
      description="Spill works when people can speak freely without making someone else feel unsafe. These are the lines we hold together."
      sections={sections}
      accent="coral"
    >
      <section className={styles.principles} aria-label="Our three principles">
        <div><span>01</span><strong>Speak freely</strong><p>Your experience belongs here.</p></div>
        <div><span>02</span><strong>Respect boundaries</strong><p>Privacy is not optional.</p></div>
        <div><span>03</span><strong>Look out for people</strong><p>Report harm. Make room for care.</p></div>
      </section>
    </PolicyShell>
  );
}
