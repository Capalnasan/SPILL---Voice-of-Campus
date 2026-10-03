import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { validate } from "@/app/(auth)/auth-form";
import { ComposerModal } from "@/components/app/composer-modal";
import { PostCard } from "@/components/app/post-card";
import { ModerationView } from "@/features/admin/moderation-view";
import { SpillProvider, useSpill } from "@/providers/spill-provider";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
  };
});

beforeEach(() => window.localStorage.clear());

function ComposerHarness() {
  const { openComposer, posts } = useSpill();
  return (
    <>
      <button type="button" onClick={openComposer}>Open composer</button>
      <output data-testid="latest-post">{posts[0]?.content}</output>
      <ComposerModal />
    </>
  );
}

function PostHarness() {
  const { posts } = useSpill();
  return posts[1] ? <PostCard post={posts[1]} /> : null;
}

describe("Phase 1 frontend interactions", () => {
  it("validates auth fields before submission", () => {
    const errors = validate(
      { pseudonym: "x", email: "not-an-email", password: "short", agreed: false },
      "register",
    );
    expect(errors.pseudonym).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
    expect(errors.agreed).toBeDefined();
  });

  it("creates a spill with a content note", () => {
    render(<SpillProvider><ComposerHarness /></SpillProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Open composer" }));
    fireEvent.change(screen.getByLabelText("Your spill"), { target: { value: "A test spill" } });
    fireEvent.click(screen.getByRole("button", { name: "Content note" }));
    fireEvent.change(screen.getByLabelText(/Content note/), { target: { value: "Mentions exams" } });
    const dialog = screen.getByRole("dialog", { name: "Create a spill" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Post" }));
    expect(screen.getByTestId("latest-post").textContent).toBe("A test spill");
  });

  it("handles post reactions and reports", () => {
    render(<SpillProvider><PostHarness /></SpillProvider>);
    fireEvent.click(screen.getByRole("button", { name: /Like\. 87 likes/ }));
    expect(screen.getByRole("button", { name: /Unlike\. 88 likes/ })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: /More options/ }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Report spill" }));
    expect(screen.getByRole("status").textContent).toMatch(/Report received/);
  });

  it("moves moderation reports through the queue", () => {
    render(<ModerationView />);
    fireEvent.click(screen.getByRole("button", { name: /Remove & notify/ }));
    expect(screen.getByRole("status").textContent).toContain("SP-1048 actioned");
  });
});
