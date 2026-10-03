import { expect, test } from "@playwright/test";

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
  await expect(page.getByText("1 votes")).toBeVisible();

  await page.getByRole("button", { name: "Like. 0 likes" }).first().click();
  await page.getByRole("button", { name: "Save spill" }).first().click();
  await page.getByRole("link", { name: "Which study break actually works?" }).click();
  await expect(page.getByRole("heading", { name: "Replies" })).toBeVisible();
  await page.getByLabel("Write a reply").fill("A quick walk clears my head.");
  await page.getByRole("button", { name: "Send reply" }).click();
  await expect(page.getByText("A quick walk clears my head.")).toBeVisible();
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
