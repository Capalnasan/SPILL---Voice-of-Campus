import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  EyeOff,
  Flag,
  Heart,
  LockKeyhole,
  MessageCircle,
  MessageSquareText,
  MoreHorizontal,
  Search,
  UserRoundX,
  UsersRound,
} from "lucide-react";

import { SpillBrand } from "@/components/brand/SpillBrand";

import styles from "./page.module.css";

type FeatureProps = Readonly<{
  accent: "coral" | "violet" | "lime";
  description: string;
  icon: ReactNode;
  title: string;
}>;

function Feature({ accent, description, icon, title }: FeatureProps) {
  return (
    <article className={styles.feature}>
      <div className={`${styles.featureIcon} ${styles[accent]}`} aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

type ReactionsProps = Readonly<{
  comments?: string;
  likes: string;
  reply?: boolean;
}>;

function Reactions({ comments, likes, reply = false }: ReactionsProps) {
  return (
    <div className={styles.reactions} role="group" aria-label="Post reactions">
      <span>
        <Heart aria-hidden="true" /> {likes}
      </span>
      {comments ? (
        <span>
          <MessageCircle aria-hidden="true" /> {comments}
        </span>
      ) : null}
      {reply ? (
        <span>
          <MessageCircle aria-hidden="true" /> Reply
        </span>
      ) : null}
    </div>
  );
}

type FeedPostProps = Readonly<{
  avatar: "lilac" | "mint";
  comments?: string;
  likes?: string;
  text: string;
  time: string;
}>;

function FeedPost({ avatar, comments, likes, text, time }: FeedPostProps) {
  return (
    <article className={styles.feedPost}>
      <span className={`${styles.avatar} ${styles[avatar]}`} aria-hidden="true" />
      <div className={styles.feedPostBody}>
        <div className={styles.postMeta}>
          <span>{time}</span>
          <MoreHorizontal aria-hidden="true" />
        </div>
        <p>{text}</p>
        {likes && comments ? <Reactions likes={likes} comments={comments} /> : null}
      </div>
    </article>
  );
}

type ThreadPostProps = Readonly<{
  avatar: "lilac" | "sand" | "mint";
  children: ReactNode;
  likes: string;
  reply?: boolean;
  time: string;
}>;

function ThreadPost({ avatar, children, likes, reply = false, time }: ThreadPostProps) {
  return (
    <article className={styles.threadPost}>
      <span className={`${styles.threadAvatar} ${styles[avatar]}`} aria-hidden="true" />
      <div>
        <p className={styles.threadMeta}>
          <strong>Anonymous</strong>
          <span>·</span>
          <span>{time}</span>
        </p>
        <p className={styles.threadText}>{children}</p>
        <Reactions likes={likes} reply={reply} />
      </div>
    </article>
  );
}

export default function MarketingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <SpillBrand className={styles.headerBrand} />
          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#safety">Safety</a>
            <a href="#community">Community</a>
          </nav>
          <Link className={styles.loginButton} href="/login">
            Log in
          </Link>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.heroTicks} aria-hidden="true">
                <i />
                <i />
              </span>
              <h1 id="hero-title">
                Say what
                <br />
                everyone’s
                <br />
                <span className={styles.underlined}>thinking.</span>
              </h1>
              <p className={styles.heroDescription}>
                A place for honest conversations, small confessions, and the thoughts that don’t
                fit anywhere else.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/feed">
                  Enter the feed <ArrowRight aria-hidden="true" />
                </Link>
                <a className={styles.textButton} href="#how-it-works">
                  <span>See how it works</span> <ArrowRight aria-hidden="true" />
                </a>
              </div>
              <p className={styles.heroNote}>Pseudonymous by default. Human by design.</p>
            </div>

            <div
              className={styles.heroVisual}
              role="img"
              aria-label="A preview of conversations in the Spill feed"
            >
              <div className={styles.violetBrush} aria-hidden="true" />
              <p className={`${styles.annotation} ${styles.annotationTop}`} aria-hidden="true">
                Same thoughts.
                <br />
                Different people.
              </p>
              <p className={`${styles.annotation} ${styles.annotationLeft}`} aria-hidden="true">
                Real talks.
                <br />
                Brighter days.
              </p>
              <p className={`${styles.annotation} ${styles.annotationRight}`} aria-hidden="true">
                Good people
                <br />
                here too.
              </p>

              <div className={styles.phone}>
                <div className={styles.phoneTopbar}>
                  <span className={styles.phoneBrand}>spill</span>
                  <Search aria-hidden="true" />
                </div>
                <div className={styles.feedTabs} aria-hidden="true">
                  <span className={styles.activeTab}>For you</span>
                  <span>Latest</span>
                  <span>Polls</span>
                </div>
                <div className={styles.feedPreview}>
                  <FeedPost
                    avatar="lilac"
                    time="Just now"
                    text="Does anyone else feel like they’re faking it a little, even when things are going well?"
                    likes="127"
                    comments="42"
                  />
                  <FeedPost
                    avatar="lilac"
                    time="2h ago"
                    text="What’s something you wish more people at this school understood?"
                    likes="89"
                    comments="31"
                  />
                  <article className={styles.feedPost}>
                    <span className={`${styles.avatar} ${styles.mint}`} aria-hidden="true" />
                    <div className={styles.feedPostBody}>
                      <div className={styles.postMeta}>
                        <span>5h ago</span>
                        <span className={styles.pollLabel}>Poll</span>
                      </div>
                      <p>Weekends: recharge or fall further behind?</p>
                      <div className={styles.poll}>
                        <div className={styles.pollRow}>
                          <span className={styles.pollFill} style={{ width: "62%" }} />
                          <span>Recharge</span>
                          <strong>62%</strong>
                        </div>
                        <div className={styles.pollRow}>
                          <span>Fall further behind</span>
                          <strong>38%</strong>
                        </div>
                      </div>
                      <small>214 votes</small>
                    </div>
                  </article>
                  <FeedPost
                    avatar="lilac"
                    time="8h ago"
                    text="Drop a confession (anonymously). What’s on your mind?"
                    likes="176"
                    comments="93"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.howSection} id="how-it-works" aria-labelledby="how-heading">
          <div className={styles.sectionInner}>
            <h2 id="how-heading" className={styles.centerHeading}>
              Find your people <span className={styles.shortUnderline}>without performing.</span>
            </h2>
            <div className={styles.features}>
              <Feature
                accent="coral"
                icon={<MessageSquareText />}
                title="Post freely"
                description="Share confessions, questions, polls, and honest thoughts — no pressure, no judgment."
              />
              <Feature
                accent="violet"
                icon={<UsersRound />}
                title="Choose your circle"
                description="Explore your campus or communities, and find conversations that feel like home."
              />
              <Feature
                accent="lime"
                icon={<LockKeyhole />}
                title="Stay in control"
                description="You decide what to share, who sees it, and when to step back."
              />
            </div>
          </div>
        </section>

        <section className={styles.safetySection} id="safety" aria-labelledby="safety-heading">
          <div className={`${styles.sectionInner} ${styles.safetyInner}`}>
            <div className={styles.safetyCopy}>
              <h2 id="safety-heading">
                Your voice,
                <br />
                your <span className={styles.violetUnderline}>boundaries.</span>
              </h2>
              <p className={styles.safetyLead}>Built for honest conversations — not chaos.</p>
              <p className={styles.safetyBody}>
                Multiple layers of moderation, community reporting, and privacy-first design help
                keep spill a safer space for real talk.
              </p>
              <p className={`${styles.annotation} ${styles.annotationEnergy}`} aria-hidden="true">
                Same energy.
                <br />
                A kinder internet.
              </p>
            </div>

            <div
              className={styles.safetyVisual}
              role="img"
              aria-label="Privacy and moderation controls preview"
            >
              <div className={styles.coralShape} aria-hidden="true" />
              <div className={styles.controlsCard}>
                <h3>Visibility</h3>
                <ul>
                  <li>
                    <span className={`${styles.radio} ${styles.radioSelected}`} aria-hidden="true" />
                    Everyone at my campus
                  </li>
                  <li>
                    <span className={styles.radio} aria-hidden="true" />
                    My communities
                  </li>
                  <li>
                    <span className={styles.radio} aria-hidden="true" />
                    Just me
                  </li>
                </ul>
                <div className={styles.cardRule} />
                <h3>Report or hide</h3>
                <ul>
                  <li>
                    <Flag aria-hidden="true" /> Report post
                  </li>
                  <li>
                    <EyeOff aria-hidden="true" /> Hide post
                  </li>
                  <li>
                    <UserRoundX aria-hidden="true" /> Block user
                  </li>
                </ul>
              </div>
              <div className={styles.controlNotice}>
                <span className={styles.noticeTicks} aria-hidden="true" />
                <LockKeyhole aria-hidden="true" />
                <h3>You’re in control</h3>
                <p>Share what you’re comfortable with. You can always edit or delete your posts.</p>
                <span className={styles.noticeButton}>Got it</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.communitySection} id="community" aria-labelledby="community-heading">
          <div className={`${styles.sectionInner} ${styles.communityInner}`}>
            <div className={styles.threadWrap}>
              <p className={`${styles.annotation} ${styles.annotationPeople}`} aria-hidden="true">
                Real people.
                <br />
                Real conversations.
              </p>
              <div
                className={styles.threadCard}
                role="group"
                aria-label="An example supportive Spill conversation"
              >
                <ThreadPost avatar="lilac" time="1d ago" likes="143">
                  I’m so homesick but I don’t want to seem weak. Does anyone else feel out of place
                  here sometimes?
                </ThreadPost>
                <ThreadPost avatar="sand" time="1d ago" likes="62" reply>
                  You’re definitely not alone. It’s a big adjustment, and it’s okay to feel that way.
                  Things get easier. <span role="img" aria-label="purple heart">💜</span>
                </ThreadPost>
                <ThreadPost avatar="mint" time="22h ago" likes="29" reply>
                  Same here. You’re stronger than you think.
                </ThreadPost>
              </div>
            </div>

            <div className={styles.communityCopy}>
              <h2 id="community-heading">
                Built for honest
                <br />
                conversations —
                <br />
                <span className={styles.coralUnderline}>not chaos.</span>
              </h2>
              <p>
                From everyday questions to late-night confessions, spill is a space for the messy,
                the meaningful, and everything in between.
              </p>
              <p className={`${styles.annotation} ${styles.annotationPerspectives}`} aria-hidden="true">
                Different perspectives.
                <br />
                A brighter campus.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="cta-heading">
          <div className={styles.ctaSplash}>
            <span className={styles.ctaTicks} aria-hidden="true" />
            <h2 id="cta-heading">Ready to spill?</h2>
            <Link className={styles.darkButton} href="/feed">
              Enter the feed <ArrowRight aria-hidden="true" />
            </Link>
            <p className={`${styles.annotation} ${styles.annotationHonest}`} aria-hidden="true">
              Honest people.
              <br />
              Happier places.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <SpillBrand className={styles.footerBrand} />
          <nav aria-label="Legal navigation">
            <Link href="/community-rules">Community rules</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
