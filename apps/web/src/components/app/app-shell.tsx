"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bookmark,
  ChevronDown,
  ChevronRight,
  FileText,
  Flame,
  Home,
  MessageCircle,
  Moon,
  PenLine,
  Plus,
  Search,
  SlidersHorizontal,
  UserRound,
  VenetianMask,
} from "lucide-react";
import { trendingTopics } from "@/data/mock-data";
import { useSpill } from "@/providers/spill-provider";
import { SpillBrand } from "@/components/brand/SpillBrand";
import { ComposerModal } from "./composer-modal";
import styles from "./app-shell.module.css";

type NavItem = {
  label: string;
  href: string;
  icon: typeof Home;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/feed", icon: Home },
  { label: "Explore", href: "/explore", icon: Search },
  { label: "Activity", href: "/activity", icon: Bell },
  { label: "Saved", href: "/saved", icon: Bookmark },
  { label: "Profile", href: "/profile", icon: UserRound },
];

const mobileNavItems = [navItems[0], navItems[1], navItems[2], navItems[4]];

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || (href !== "/feed" && pathname.startsWith(`${href}/`));
}

function NavLink({ item, compact = false }: { item: NavItem; compact?: boolean }) {
  const pathname = usePathname();
  const active = isCurrentPath(pathname ?? "", item.href);
  const Icon = item.icon;

  return (
    <Link
      className={`${compact ? styles.bottomNavLink : styles.navLink} ${active ? styles.active : ""}`}
      href={item.href}
      aria-current={active ? "page" : undefined}
    >
      <Icon aria-hidden="true" strokeWidth={active ? 2.45 : 2} />
      <span>{item.label}</span>
      {item.label === "Activity" ? <i className={styles.notificationDot}>1</i> : null}
    </Link>
  );
}

function LeftRail() {
  const { openComposer } = useSpill();

  return (
    <aside className={styles.leftRail} aria-label="Primary navigation">
      <SpillBrand className={styles.shellBrand} href="/feed" variant="compact" />
      <nav className={styles.navList}>
        {navItems.map((item) => (
          <NavLink item={item} key={item.href} />
        ))}
      </nav>
      <button className={styles.spillButton} type="button" onClick={openComposer}>
        <PenLine aria-hidden="true" />
        <span>Spill something</span>
      </button>
      <div className={styles.leftMessage} aria-hidden="true">
        <p>same people.<br />new perspectives.</p>
        <span />
        <small>A KINDER CAMPUS<br />STARTS HERE.</small>
      </div>
    </aside>
  );
}

function TopicIcon({ icon }: { icon: (typeof trendingTopics)[number]["icon"] }) {
  if (icon === "flame") {
    return <Flame aria-hidden="true" />;
  }

  if (icon === "message") {
    return <MessageCircle aria-hidden="true" />;
  }

  return <Moon aria-hidden="true" />;
}

function RightRail() {
  const { profile } = useSpill();
  return (
    <aside className={styles.rightRail} aria-label="Community highlights">
      <Link className={styles.profileSummary} href="/profile">
        <span className={styles.profileAvatar}><VenetianMask aria-hidden="true" /></span>
        <span><small>good to see you,</small><strong>{profile.displayName}</strong></span>
        <ChevronDown aria-hidden="true" />
      </Link>

      <section className={styles.railPanel}>
        <h2 className="display-type">Happening now</h2>
        <div className={styles.topicList}>
          {trendingTopics.map((topic) => (
            <Link className={styles.topicRow} href={`/explore?topic=${encodeURIComponent(topic.label)}`} key={topic.label}>
              <span className={`${styles.topicIcon} ${styles[topic.icon]}`}><TopicIcon icon={topic.icon} /></span>
              <span><strong>{topic.label}</strong><small>{topic.count}</small></span>
              <ChevronRight aria-hidden="true" />
            </Link>
          ))}
          <Link className={styles.exploreTopics} href="/explore">
            <strong>Explore more topics</strong><ChevronRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={styles.railPanel}>
        <h2 className="display-type">Your space</h2>
        <div className={styles.spaceRow}>
          <VenetianMask aria-hidden="true" />
          <span><strong><i />Anonymous mode: on</strong><small>Your posts, identity, and activity stay private.</small></span>
        </div>
        <Link className={styles.spaceRow} href="/community-rules">
          <FileText aria-hidden="true" />
          <span><strong>Community rules</strong><small>Keep it kind, real, and respectful</small></span>
        </Link>
        <Link className={styles.spaceRow} href="/profile">
          <SlidersHorizontal aria-hidden="true" />
          <span><strong>Tune your feed</strong><small>Choose what you see (and don’t)</small></span>
        </Link>
      </section>

      <div className={styles.rightMessage} aria-hidden="true">
        <p>real people<br />brighter conversations</p><span />
      </div>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className={styles.mobileHeader}>
      <SpillBrand className={styles.mobileBrand} href="/feed" />
      <div>
        <Link href="/explore" aria-label="Search"><Search aria-hidden="true" /></Link>
        <Link href="/activity" aria-label="Activity"><Bell aria-hidden="true" /></Link>
      </div>
    </header>
  );
}

function BottomNav() {
  const { openComposer } = useSpill();

  return (
    <nav className={styles.bottomNav} aria-label="Mobile navigation">
      <NavLink compact item={mobileNavItems[0]} />
      <NavLink compact item={mobileNavItems[1]} />
      <button className={styles.createMobile} type="button" onClick={openComposer} aria-label="Create a spill">
        <Plus aria-hidden="true" />
      </button>
      <NavLink compact item={mobileNavItems[2]} />
      <NavLink compact item={mobileNavItems[3]} />
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { notice, storageError } = useSpill();

  return (
    <div className={styles.shell}>
      <LeftRail />
      <div className={styles.centerColumn}>
        <MobileHeader />
        <main className={styles.main}>{children}</main>
      </div>
      <RightRail />
      <BottomNav />
      <ComposerModal />
      <div className={`${styles.toast} ${notice || storageError ? styles.toastVisible : ""}`} role="status" aria-live="polite">
        {notice || storageError}
      </div>
    </div>
  );
}

