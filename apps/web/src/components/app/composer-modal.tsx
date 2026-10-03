"use client";

import Image from "next/image";
import {
  BarChart3,
  ChevronDown,
  Globe2,
  Image as ImageIcon,
  Plus,
  TriangleAlert,
  VenetianMask,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { useSpill } from "@/providers/spill-provider";
import styles from "./composer-modal.module.css";

const MAX_LENGTH = 500;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export function ComposerModal() {
  const { addPost, closeComposer, composerOpen } = useSpill();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [activeExtra, setActiveExtra] = useState<"photo" | "poll" | "note" | null>(null);
  const [image, setImage] = useState<string>();
  const [imageName, setImageName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [contentNote, setContentNote] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (composerOpen && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => textareaRef.current?.focus());
    } else if (!composerOpen && dialog.open) {
      dialog.close();
    }
  }, [composerOpen]);

  const completePollOptions = pollOptions.map((option) => option.trim()).filter(Boolean);
  const pollValid = activeExtra !== "poll" || completePollOptions.length >= 2;

  function resetComposer() {
    setContent("");
    setActiveExtra(null);
    setImage(undefined);
    setImageName("");
    setPhotoError("");
    setPollOptions(["", ""]);
    setContentNote("");
  }

  function handleClose() {
    closeComposer();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) handleClose();
  }

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > MAX_IMAGE_BYTES) {
      setPhotoError("Choose a JPG, PNG, or WebP image under 4 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        setImageName(file.name);
        setPhotoError("");
        setActiveExtra("photo");
      }
    });
    reader.readAsDataURL(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      textareaRef.current?.focus();
      return;
    }
    if (!pollValid) return;

    addPost({
      content: trimmedContent,
      anonymous,
      image,
      contentNote: activeExtra === "note" ? contentNote : undefined,
      pollOptions: activeExtra === "poll" ? completePollOptions : undefined,
    });
    resetComposer();
    closeComposer();
  }

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      aria-labelledby="composer-title"
      aria-describedby="composer-description"
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onClick={handleBackdropClick}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.handle} aria-hidden="true" />
        <header className={styles.header}>
          <button type="button" onClick={handleClose} aria-label="Close composer">
            <X aria-hidden="true" />
          </button>
          <h2 className="display-type" id="composer-title">Create a spill</h2>
          <span aria-hidden="true" />
        </header>

        <p className="sr-only" id="composer-description">
          Share a message with the Spill community. Your spill can be up to 500 characters.
        </p>

        <div className={styles.editor}>
          <label className="sr-only" htmlFor="spill-content">Your spill</label>
          <textarea
            id="spill-content"
            ref={textareaRef}
            value={content}
            maxLength={MAX_LENGTH}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Say it like you mean it…"
          />
          <output aria-live="polite">{content.length} / {MAX_LENGTH}</output>
        </div>

        <button className={styles.settingRow} type="button">
          <Globe2 aria-hidden="true" />
          <span>Everyone</span>
          <ChevronDown aria-hidden="true" />
        </button>

        <button
          className={styles.settingRow}
          type="button"
          role="switch"
          aria-checked={anonymous}
          onClick={() => setAnonymous((current) => !current)}
        >
          <VenetianMask aria-hidden="true" />
          <span><strong>Post anonymously</strong><small>Your username won’t be shown.</small></span>
          <i className={`${styles.switch} ${anonymous ? styles.switchOn : ""}`} aria-hidden="true"><b /></i>
        </button>

        <fieldset className={styles.extras}>
          <legend className="sr-only">Add to your spill</legend>
          <button
            className={activeExtra === "photo" ? styles.extraActive : ""}
            type="button"
            aria-pressed={activeExtra === "photo"}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon aria-hidden="true" /><span>Photo</span>
          </button>
          <button
            className={activeExtra === "poll" ? styles.extraActive : ""}
            type="button"
            aria-pressed={activeExtra === "poll"}
            onClick={() => setActiveExtra((current) => current === "poll" ? null : "poll")}
          >
            <BarChart3 aria-hidden="true" /><span>Poll</span>
          </button>
          <button
            className={activeExtra === "note" ? styles.extraActive : ""}
            type="button"
            aria-pressed={activeExtra === "note"}
            onClick={() => setActiveExtra((current) => current === "note" ? null : "note")}
          >
            <TriangleAlert aria-hidden="true" /><span>Content note</span>
          </button>
        </fieldset>

        <input
          className="sr-only"
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handlePhoto}
        />

        {photoError ? <p className={styles.error} role="alert">{photoError}</p> : null}

        {activeExtra === "photo" && image ? (
          <section className={styles.photoPreview} aria-label="Photo attachment preview">
            <div><Image src={image} alt="Selected attachment preview" fill unoptimized sizes="560px" /></div>
            <span>{imageName}</span>
            <button
              type="button"
              aria-label="Remove photo"
              onClick={() => {
                setImage(undefined);
                setImageName("");
                setActiveExtra(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            ><X aria-hidden="true" /></button>
          </section>
        ) : null}

        {activeExtra === "poll" ? (
          <fieldset className={styles.pollEditor}>
            <legend>Poll choices</legend>
            {pollOptions.map((option, index) => (
              <div key={`poll-option-${index}`}>
                <label className="sr-only" htmlFor={`poll-option-${index}`}>Option {index + 1}</label>
                <input
                  id={`poll-option-${index}`}
                  value={option}
                  maxLength={70}
                  placeholder={`Option ${index + 1}`}
                  onChange={(event) => setPollOptions((current) =>
                    current.map((item, itemIndex) => itemIndex === index ? event.target.value : item),
                  )}
                />
                {pollOptions.length > 2 ? (
                  <button
                    type="button"
                    aria-label={`Remove option ${index + 1}`}
                    onClick={() => setPollOptions((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                  ><X aria-hidden="true" /></button>
                ) : null}
              </div>
            ))}
            {pollOptions.length < 4 ? (
              <button className={styles.addOption} type="button" onClick={() => setPollOptions((current) => [...current, ""])}>
                <Plus aria-hidden="true" /> Add option
              </button>
            ) : null}
            {!pollValid ? <p className={styles.error}>Add at least two choices.</p> : null}
          </fieldset>
        ) : null}

        {activeExtra === "note" ? (
          <div className={styles.noteEditor}>
            <label htmlFor="content-note">Content note <span>optional</span></label>
            <input
              id="content-note"
              value={contentNote}
              maxLength={80}
              placeholder="e.g. Mentions grief"
              onChange={(event) => setContentNote(event.target.value)}
            />
            <small>Readers will see this before the spill.</small>
          </div>
        ) : null}

        <footer className={styles.footer}>
          <button className={styles.cancel} type="button" onClick={handleClose}>Cancel</button>
          <button className={styles.submit} type="submit" disabled={!content.trim() || !pollValid}>Post</button>
        </footer>
      </form>
    </dialog>
  );
}
