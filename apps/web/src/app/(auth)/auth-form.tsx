"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./auth.module.css";

type Mode = "login" | "register";

type FormValues = {
  pseudonym: string;
  email: string;
  password: string;
  agreed: boolean;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(values: FormValues, mode: Mode): FieldErrors {
  const errors: FieldErrors = {};

  if (mode === "register") {
    const pseudonym = values.pseudonym.trim();
    if (!pseudonym) errors.pseudonym = "Choose a pseudonym.";
    else if (pseudonym.length < 3) errors.pseudonym = "Use at least 3 characters.";
    else if (!/^[a-zA-Z0-9._-]+$/.test(pseudonym)) {
      errors.pseudonym = "Use letters, numbers, dots, dashes, or underscores.";
    }
  }

  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!emailPattern.test(values.email)) errors.email = "Enter a valid email address.";

  if (!values.password) errors.password = "Enter your password.";
  else if (values.password.length < 8) errors.password = "Use at least 8 characters.";

  if (mode === "register" && !values.agreed) {
    errors.agreed = "Confirm that you agree before continuing.";
  }

  return errors;
}

export function AuthForm({ mode }: { mode: Mode }) {
  const isRegister = mode === "register";
  const [values, setValues] = useState<FormValues>({
    pseudonym: "",
    email: "",
    password: "",
    agreed: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) successHeading.current?.focus();
  }, [submitted]);

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validate(nextValues, mode)[field] }));
    }
  }

  function checkField(field: keyof FormValues) {
    const fieldError = validate(values, mode)[field];
    setErrors((current) => ({ ...current, [field]: fieldError }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values, mode);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <span className={styles.successMark} aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m6.5 12.5 3.3 3.2 7.7-8" /></svg>
        </span>
        <h2 ref={successHeading} tabIndex={-1}>
          {isRegister ? "You’re in." : "Welcome back."}
        </h2>
        <p>
          {isRegister
            ? `Your space is ready${values.pseudonym ? `, ${values.pseudonym}` : ""}. Start with a look around.`
            : "Your feed is ready. See what your people are talking about."}
        </p>
        <Link className={styles.primaryButton} href="/feed">
          Enter the feed
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
        </Link>
        <button className={styles.textButton} type="button" onClick={() => setSubmitted(false)}>
          Use a different account
        </button>
      </div>
    );
  }

  return (
    <div className={styles.formWrap}>
      <div className={styles.formHeading}>
        <h2>{isRegister ? "Find your people." : "Good to see you."}</h2>
        <p>
          {isRegister
            ? "Create your pseudonymous profile and make this space yours."
            : "Log in to pick up where the conversation left off."}
        </p>
      </div>

      <div className={styles.modeSwitch} aria-label="Account access">
        <Link className={!isRegister ? styles.activeMode : undefined} href="/login">
          Log in
        </Link>
        <Link className={isRegister ? styles.activeMode : undefined} href="/register">
          Create account
        </Link>
      </div>

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        {isRegister && (
          <div className={styles.field}>
            <label htmlFor="pseudonym">Pseudonym</label>
            <input
              id="pseudonym"
              name="pseudonym"
              type="text"
              autoComplete="nickname"
              placeholder="quietcomet"
              value={values.pseudonym}
              aria-invalid={Boolean(errors.pseudonym)}
              aria-describedby={errors.pseudonym ? "pseudonym-error" : "pseudonym-hint"}
              onBlur={() => checkField("pseudonym")}
              onChange={(event) => updateField("pseudonym", event.target.value)}
            />
            {errors.pseudonym ? (
              <p className={styles.error} id="pseudonym-error">{errors.pseudonym}</p>
            ) : (
              <p className={styles.hint} id="pseudonym-hint">This is how people will know you.</p>
            )}
          </div>
        )}

        <div className={styles.field}>
          <label htmlFor={`${mode}-email`}>Email</label>
          <input
            id={`${mode}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@campus.edu"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${mode}-email-error` : undefined}
            onBlur={() => checkField("email")}
            onChange={(event) => updateField("email", event.target.value)}
          />
          {errors.email && <p className={styles.error} id={`${mode}-email-error`}>{errors.email}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${mode}-password`}>Password</label>
          <div className={styles.passwordControl}>
            <input
              id={`${mode}-password`}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isRegister ? "new-password" : "current-password"}
              placeholder="At least 8 characters"
              value={values.password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? `${mode}-password-error` : undefined}
              onBlur={() => checkField("password")}
              onChange={(event) => updateField("password", event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.8 10.8 0 0 1 12 4c5.3 0 9 5.2 9 5.2a14.4 14.4 0 0 1-2.4 2.7M6.2 6.2C4.2 7.5 3 9.2 3 9.2s3.7 5.2 9 5.2c1 0 2-.2 2.8-.5" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.7-5.2 9-5.2S21 12 21 12s-3.7 5.2-9 5.2S3 12 3 12Z" /><circle cx="12" cy="12" r="2.3" /></svg>
              )}
            </button>
          </div>
          {errors.password && <p className={styles.error} id={`${mode}-password-error`}>{errors.password}</p>}
        </div>

        {isRegister && (
          <div className={styles.consent}>
            <label>
              <input
                type="checkbox"
                checked={values.agreed}
                aria-invalid={Boolean(errors.agreed)}
                aria-describedby={errors.agreed ? "agreement-error" : undefined}
                onBlur={() => checkField("agreed")}
                onChange={(event) => updateField("agreed", event.target.checked)}
              />
              <span aria-hidden="true"><svg viewBox="0 0 16 16"><path d="m3.5 8 3 3 6-6" /></svg></span>
              <em>
                I agree to the <Link href="/terms">Terms</Link> and have read the{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </em>
            </label>
            {errors.agreed && <p className={styles.error} id="agreement-error">{errors.agreed}</p>}
          </div>
        )}

        <button className={styles.primaryButton} type="submit">
          {isRegister ? "Create my account" : "Log in"}
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
        </button>
      </form>

      <p className={styles.demoNote}>
        Frontend preview — any valid details will take you to the demo feed.
      </p>
    </div>
  );
}
