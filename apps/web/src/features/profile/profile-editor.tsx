"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useSpill } from "@/providers/spill-provider";
import styles from "./profile-view.module.css";

export function ProfileEditor({ onClose }: { onClose: () => void }) {
  const { profile, updateProfile } = useSpill();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!displayName.trim()) return;
    updateProfile({ displayName, bio });
    onClose();
  }

  return (
    <dialog ref={dialogRef} className={styles.editor} aria-labelledby="profile-editor-title"
      onCancel={onClose} onClose={onClose}
      onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}>
      <form onSubmit={submit}>
        <header>
          <div><small>YOUR LITTLE CORNER</small><h2 id="profile-editor-title" className="display-type">Edit profile</h2></div>
          <button type="button" aria-label="Close profile editor" onClick={onClose}><X size={21} aria-hidden="true" /></button>
        </header>
        <label>Display name
          <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} required maxLength={40} />
          <small>Your handle stays @sunflower.</small>
        </label>
        <label>Bio
          <textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={160} rows={3} />
          <small>{bio.length}/160</small>
        </label>
        <footer>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" disabled={!displayName.trim()}>Save profile</button>
        </footer>
      </form>
    </dialog>
  );
}
