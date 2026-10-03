"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  EyeOff,
  Flag,
  Gauge,
  MessageSquareText,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import styles from "./moderation-view.module.css";

type ReportStatus = "open" | "resolved" | "dismissed";

type Report = {
  id: string;
  reason: string;
  content: string;
  author: string;
  reportedBy: string;
  age: string;
  severity: "high" | "medium" | "low";
  context: string;
  status: ReportStatus;
};

const seedReports: Report[] = [
  {
    id: "SP-1048",
    reason: "Targeted harassment",
    content: "everyone knows who this is about. maybe they should finally take the hint and leave.",
    author: "Anonymous",
    reportedBy: "3 community members",
    age: "6 min ago",
    severity: "high",
    context: "The post references a recent campus event and may identify a private person through context.",
    status: "open",
  },
  {
    id: "SP-1047",
    reason: "Personal information",
    content: "does anybody else in the east dorm know what happened on the third floor last night?",
    author: "hallwayecho",
    reportedBy: "1 community member",
    age: "18 min ago",
    severity: "medium",
    context: "Potentially sensitive location detail. No direct name or contact information appears in the post.",
    status: "open",
  },
  {
    id: "SP-1046",
    reason: "Spam",
    content: "selling two tickets for friday — message me if you want them.",
    author: "weekendplans",
    reportedBy: "Automated signal",
    age: "41 min ago",
    severity: "low",
    context: "The author has not posted duplicate content. This may be a legitimate community exchange.",
    status: "open",
  },
];

const navItems = [
  { label: "Overview", icon: Gauge },
  { label: "Reports", icon: Flag, active: true },
  { label: "Users", icon: UserRound },
  { label: "Keywords", icon: MessageSquareText },
];

export function ModerationView() {
  const [reports, setReports] = useState(seedReports);
  const [selectedId, setSelectedId] = useState(seedReports[0].id);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const visibleReports = reports.filter(
    (report) =>
      report.status === "open" &&
      `${report.id} ${report.reason} ${report.content}`.toLowerCase().includes(query.toLowerCase()),
  );
  const selected = reports.find((report) => report.id === selectedId) ?? visibleReports[0];

  function review(nextStatus: Exclude<ReportStatus, "open">) {
    if (!selected) return;
    const reviewedId = selected.id;
    const remaining = visibleReports.filter((report) => report.id !== reviewedId);
    setReports((items) =>
      items.map((report) => (report.id === reviewedId ? { ...report, status: nextStatus } : report)),
    );
    setSelectedId(remaining[0]?.id ?? "");
    setStatus(nextStatus === "resolved" ? `${reviewedId} actioned` : `${reviewedId} dismissed`);
    window.setTimeout(() => setStatus(""), 1800);
  }

  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <Link href="/feed" className={styles.brand}>
          <span className="display-type">spill</span><i aria-hidden="true" />
        </Link>
        <p className={styles.deskLabel}>Moderation desk</p>
        <nav aria-label="Moderation navigation">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button type="button" key={label} className={active ? styles.navActive : ""}>
              <Icon size={18} aria-hidden="true" /> {label}
              {label === "Reports" ? <span>{visibleReports.length}</span> : null}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <ShieldCheck size={19} aria-hidden="true" />
          <span><strong>Safety status</strong><small>All systems normal</small></span>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <Link href="/feed" aria-label="Back to Spill"><ArrowLeft size={19} /></Link>
            <div><h1 className="display-type">Reports</h1><p>Keep the conversation human.</p></div>
          </div>
          <span className={styles.modAvatar}>M</span>
        </header>

        <section className={styles.workspace}>
          <div className={styles.queue}>
            <div className={styles.queueHeader}>
              <div><strong>Review queue</strong><span>{visibleReports.length} open</span></div>
              <label>
                <Search size={17} aria-hidden="true" />
                <span className="sr-only">Search reports</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reports" />
              </label>
            </div>

            <div className={styles.reportList}>
              {visibleReports.map((report) => (
                <button
                  type="button"
                  key={report.id}
                  className={report.id === selected?.id ? styles.reportActive : ""}
                  onClick={() => setSelectedId(report.id)}
                >
                  <span className={`${styles.severity} ${styles[report.severity]}`} />
                  <span className={styles.reportCopy}>
                    <span><strong>{report.reason}</strong><time>{report.age}</time></span>
                    <small>{report.content}</small>
                    <em>{report.id} · {report.reportedBy}</em>
                  </span>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              ))}
              {!visibleReports.length ? (
                <div className={styles.clearQueue}>
                  <Check size={25} aria-hidden="true" />
                  <strong>Queue cleared.</strong>
                  <span>That’s a kinder internet for today.</span>
                </div>
              ) : null}
            </div>
          </div>

          <aside className={styles.detail} aria-live="polite">
            {selected && selected.status === "open" ? (
              <>
                <div className={styles.detailTopline}>
                  <span className={`${styles.severityLabel} ${styles[selected.severity]}`}>{selected.severity} priority</span>
                  <span>{selected.id}</span>
                </div>
                <h2 className="display-type">{selected.reason}</h2>
                <p className={styles.reportMeta}>Reported by {selected.reportedBy} · {selected.age}</p>
                <blockquote>{selected.content}</blockquote>
                <dl>
                  <div><dt>Author</dt><dd>{selected.author}</dd></div>
                  <div><dt>Previous strikes</dt><dd>{selected.severity === "high" ? "1 warning" : "None"}</dd></div>
                  <div><dt>Reach</dt><dd>{selected.severity === "high" ? "184 views" : "Under 50 views"}</dd></div>
                </dl>
                <div className={styles.context}>
                  <EyeOff size={18} aria-hidden="true" />
                  <div><strong>Context check</strong><p>{selected.context}</p></div>
                </div>
                <div className={styles.actions}>
                  <button type="button" className={styles.resolve} onClick={() => review("resolved")}>
                    <ShieldCheck size={18} aria-hidden="true" /> Remove & notify
                  </button>
                  <button type="button" onClick={() => review("dismissed")}>
                    <X size={18} aria-hidden="true" /> Dismiss report
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.detailEmpty}><ShieldCheck size={34} /><h2 className="display-type">Nothing to review.</h2></div>
            )}
          </aside>
        </section>
      </main>
      <div className={`${styles.toast} ${status ? styles.toastVisible : ""}`} role="status">{status}</div>
    </div>
  );
}

