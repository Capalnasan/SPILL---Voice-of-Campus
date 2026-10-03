"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";

const STORAGE_KEY = "spill.theme";

type Theme = "light" | "dark";

function getActiveTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#14111a" : "#ffffff");
}

export function ThemeToggle() {
  useLayoutEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const activeTheme = saved === "light" || saved === "dark"
      ? saved
      : typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    applyTheme(activeTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = getActiveTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <Sun className="theme-icon-sun" aria-hidden="true" />
      <Moon className="theme-icon-moon" aria-hidden="true" />
    </button>
  );
}
