import { expect, test } from "@playwright/test";

test("entering the feed from the landing page and refreshing resolves the route", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await page.getByRole("link", { name: /enter the feed/i }).first().click();
  await expect(page).toHaveURL(/\/feed$/);
  await expect(page).toHaveTitle("Home — Spill");
  await expect(page.getByRole("region", { name: "Home", exact: true })).toBeVisible();

  const response = await page.reload();
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("region", { name: "Home", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("landing page supports a persistent dark theme", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /say what/i })).toBeVisible();

  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("a visitor can create and vote in a poll", async ({ page }) => {
  await page.goto("/feed");
  await page.getByRole("button", { name: /create a spill|spill something/i }).first().click();
  await expect(page.getByRole("dialog", { name: "Create a spill" })).toBeVisible();

  await page.getByLabel("Your spill").fill("Which study break actually works?");
  await page.getByRole("button", { name: "Poll", exact: true }).click();
  await page.getByLabel("Option 1").fill("A short walk");
  await page.getByLabel("Option 2").fill("Coffee with a friend");
  await page.getByRole("dialog").getByRole("button", { name: "Post", exact: true }).click();

  await expect(page.getByText("Which study break actually works?")).toBeVisible();
  await page.getByRole("button", { name: /a short walk/i }).click();
  await expect(page.getByText("1 vote · You voted", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Like. 0 likes" }).first().click();
  await page.getByRole("button", { name: "Save spill" }).first().click();
  await page.getByRole("link", { name: "Which study break actually works?" }).click();
  await expect(page.getByRole("heading", { name: "Replies" })).toBeVisible();
  await page.getByLabel("Write a reply").fill("A quick walk clears my head.");
  await page.getByRole("button", { name: "Send reply" }).click();
  await expect(page.getByText("A quick walk clears my head.")).toBeVisible();

  await page.reload();
  await expect(page.getByText("A quick walk clears my head.")).toBeVisible();
  await expect(page.getByRole("button", { name: /a short walk/i })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: /a short walk/i })).toBeDisabled();
  await expect(page.getByText("1 vote · You voted", { exact: true })).toBeVisible();
});

test("composer supports local photo preview and keyboard dismissal", async ({ page }) => {
  await page.goto("/feed");
  const openComposer = page.getByRole("button", { name: /create a spill|spill something/i }).first();
  await openComposer.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Create a spill" });
  await expect(dialog).toBeVisible();

  await page.locator('input[type="file"]').setInputFiles("public/images/study-progress.png");
  await expect(page.getByRole("img", { name: "Selected attachment preview" })).toBeVisible();
  await page.getByRole("button", { name: "Remove photo" }).click();
  await expect(page.getByRole("img", { name: "Selected attachment preview" })).toHaveCount(0);

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("moderation desk fits the laptop viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/admin");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("replies belong to their conversation and keep their thread and reactions", async ({ page }) => {
  await page.goto("/post/midnight-library");
  await expect(page.getByRole("heading", { name: "Replies" })).toBeVisible();
  const original = page.getByRole("article", { name: "Reply by notetaker" }).first();
  await original.getByRole("button", { name: "Reply to notetaker" }).click();
  await expect(page.getByText("Replying to", { exact: false })).toBeVisible();
  await page.getByLabel("Write a reply").fill("A little solidarity from my corner of campus.");
  await page.getByRole("button", { name: "Send reply" }).click();
  const mine = page.getByRole("article", { name: "Reply by sunflower" });
  await expect(mine).toContainText("A little solidarity from my corner of campus.");
  await mine.getByRole("button", { name: "Like reply. 0 likes" }).click();
  await page.reload();
  await expect(mine.getByRole("button", { name: "Unlike reply. 1 likes" })).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Sort replies").selectOption("newest");
  await expect(page.getByRole("article", { name: "Reply by notetaker" }).first()).toBeVisible();
  await page.goto("/post/north-star");
  await expect(page.getByText("Be the first to reply.")).toBeVisible();
  await expect(page.getByText("A little solidarity from my corner of campus.")).toHaveCount(0);
  await page.goto("/profile");
  await page.getByRole("tab", { name: "Replies", exact: true }).click();
  await expect(page.getByText("A little solidarity from my corner of campus.")).toBeVisible();
});

test("deleting a reply preserves responses beneath it and updates the count", async ({ page }) => {
  await page.goto("/post/north-star");
  await page.getByLabel("Write a reply").fill("My first reply in this conversation.");
  await page.getByRole("button", { name: "Send reply" }).click();
  const parent = page.getByRole("article", { name: "Reply by sunflower" }).filter({ hasText: "My first reply in this conversation." });
  await parent.getByRole("button", { name: "Reply to sunflower" }).click();
  await page.getByLabel("Write a reply").fill("The follow-up should stay when the parent is deleted.");
  await page.getByRole("button", { name: "Send reply" }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await parent.getByRole("button", { name: "Delete your reply" }).click();
  await expect(page.getByText("This reply was deleted.")).toBeVisible();
  await expect(page.getByText("The follow-up should stay when the parent is deleted.")).toBeVisible();
  await expect(page.getByText("1 reply", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText("This reply was deleted.")).toBeVisible();
  await expect(page.getByText("The follow-up should stay when the parent is deleted.")).toBeVisible();
});

test("missing and deleted spills do not display an unrelated conversation", async ({ page }) => {
  await page.goto("/post/no-such-spill");
  await expect(page.getByRole("heading", { name: "This spill drifted away." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Replies", exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: "Back to the feed" }).click();
  await expect(page).toHaveURL(/\/feed$/);
  await expect(page.getByRole("region", { name: "Home", exact: true })).toBeVisible();
  await page.getByRole("button", { name: /create a spill|spill something/i }).first().click();
  const composer = page.getByRole("dialog", { name: "Create a spill" });
  await composer.getByLabel("Your spill").fill("A temporary spill for checking deletion.");
  await composer.getByRole("button", { name: "Post", exact: true }).click();
  await page.getByRole("link", { name: "A temporary spill for checking deletion." }).click();
  await expect(page.getByRole("heading", { name: "Replies", exact: true })).toBeVisible();
  const originalSpill = page.getByRole("region", { name: "Original spill" });
  await originalSpill.getByRole("button", { name: /More options/ }).click();
  await originalSpill.getByRole("menuitem", { name: "Delete spill" }).click();
  await expect(page.getByRole("heading", { name: "This spill drifted away." })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "This spill drifted away." })).toBeVisible();
});

test("profile edits persist and anonymous spills stay off the public profile", async ({ page }) => {
  await page.goto("/profile");
  await page.getByRole("button", { name: "Edit profile", exact: true }).click();
  const editor = page.getByRole("dialog", { name: "Edit profile" });
  await expect(editor).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(editor).not.toBeVisible();
  await page.getByRole("button", { name: "Edit profile", exact: true }).click();
  await editor.getByRole("textbox", { name: /Display name/ }).fill("Sunny campus days");
  await editor.getByRole("textbox", { name: /Bio/ }).fill("Small wins, big coffee energy.");
  await editor.getByRole("button", { name: "Save profile" }).click();
  await expect(editor).not.toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Sunny campus days" })).toBeVisible();
  await expect(page.getByText("Small wins, big coffee energy.")).toBeVisible();
  await page.getByRole("button", { name: /create a spill|spill something/i }).first().click();
  const composer = page.getByRole("dialog", { name: "Create a spill" });
  await composer.getByLabel("Your spill").fill("An anonymous thought stays out of my public profile.");
  await composer.getByRole("button", { name: "Post", exact: true }).click();
  await expect(page.getByText("An anonymous thought stays out of my public profile.")).toHaveCount(0);
  await page.getByRole("button", { name: /create a spill|spill something/i }).first().click();
  await composer.getByLabel("Your spill").fill("My public campus photo.");
  await composer.getByRole("switch").click();
  await expect(composer.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  await composer.locator('input[type="file"]').setInputFiles("public/images/study-progress.png");
  await expect(composer.getByRole("img", { name: "Selected attachment preview" })).toBeVisible();
  await composer.getByRole("button", { name: "Post", exact: true }).click();
  await page.getByRole("tab", { name: "Media", exact: true }).click();
  await expect(page.getByText("My public campus photo.")).toBeVisible();
  await page.reload();
  await page.getByRole("tab", { name: "Media", exact: true }).click();
  await expect(page.getByText("My public campus photo.")).toBeVisible();
});
