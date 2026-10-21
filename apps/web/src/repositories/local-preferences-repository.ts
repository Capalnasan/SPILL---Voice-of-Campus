import type { ActivityItem, SpillPreferences } from "@/types/models";
import type { RepositoryResult } from "./post-repository";

const PREFERENCES_KEY = "spill.settings.v2";
const LEGACY_PREFERENCES_KEY = "spill.settings.v1";
const ACTIVITY_KEY = "spill.activity.v1";

export const defaultPreferences: SpillPreferences = {
  anonymousByDefault: true,
  reactionNotifications: true,
  replyNotifications: true,
  weeklyDigest: false,
};

export const seedActivity: ActivityItem[] = [
  { id: "a1", type: "reply", actor: "notetaker", text: "replied to your spill", preview: "this is exactly how my week has felt too.", time: "12m", unread: true, href: "/post/midnight-library" },
  { id: "a2", type: "like", actor: "5 people", text: "felt your spill", preview: "got an A on my orgo midterm!!!", time: "48m", unread: true, href: "/post/north-star" },
  { id: "a3", type: "mention", actor: "softlaunch", text: "mentioned you in a reply", preview: "@sunflower said it better than I could.", time: "3h", unread: false, href: "/post/soft-launch" },
  { id: "a4", type: "safety", actor: "Spill safety", text: "checked in on a report", preview: "Thanks for looking out for your community. We handled it.", time: "1d", unread: false, href: "/community-rules" },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function save(key: string, value: unknown): RepositoryResult {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return { ok: true };
  } catch {
    return { ok: false, message: "Changes will last for this visit, but could not be saved on this device." };
  }
}

export const localPreferencesRepository = {
  load(): SpillPreferences {
    if (typeof window === "undefined") return { ...defaultPreferences };
    try {
      const current = window.localStorage.getItem(PREFERENCES_KEY);
      if (current) {
        const value: unknown = JSON.parse(current);
        if (isRecord(value) && value.version === 2 && isRecord(value.preferences)) {
          const preferences = value.preferences;
          if (Object.values(preferences).every((item) => typeof item === "boolean")) {
            return { ...defaultPreferences, ...preferences };
          }
        }
      }

      const legacy = window.localStorage.getItem(LEGACY_PREFERENCES_KEY);
      if (!legacy) return { ...defaultPreferences };
      const value: unknown = JSON.parse(legacy);
      if (!isRecord(value)) return { ...defaultPreferences };
      return {
        anonymousByDefault: typeof value.anonymous === "boolean" ? value.anonymous : true,
        reactionNotifications: typeof value.reactions === "boolean" ? value.reactions : true,
        replyNotifications: typeof value.replies === "boolean" ? value.replies : true,
        weeklyDigest: typeof value.digest === "boolean" ? value.digest : false,
      };
    } catch {
      return { ...defaultPreferences };
    }
  },
  save(preferences: SpillPreferences) {
    const result = save(PREFERENCES_KEY, { version: 2, preferences });
    if (result.ok) window.localStorage.removeItem(LEGACY_PREFERENCES_KEY);
    return result;
  },
};

function isActivityItem(value: unknown): value is ActivityItem {
  return isRecord(value)
    && ["id", "actor", "text", "preview", "time", "href"].every((key) => typeof value[key] === "string")
    && ["reply", "like", "mention", "safety"].includes(String(value.type))
    && typeof value.unread === "boolean";
}

export const localActivityRepository = {
  load(): ActivityItem[] {
    if (typeof window === "undefined") return seedActivity.map((item) => ({ ...item }));
    try {
      const raw = window.localStorage.getItem(ACTIVITY_KEY);
      if (!raw) return seedActivity.map((item) => ({ ...item }));
      const value: unknown = JSON.parse(raw);
      return isRecord(value) && value.version === 1 && Array.isArray(value.items) && value.items.every(isActivityItem)
        ? value.items
        : seedActivity.map((item) => ({ ...item }));
    } catch {
      return seedActivity.map((item) => ({ ...item }));
    }
  },
  save(items: ActivityItem[]) {
    return save(ACTIVITY_KEY, { version: 1, items });
  },
};
