"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import styles from "../auth.module.css";

function GoogleIcon() {
  return (
    <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

function RegisterForm() {
  const { user, signup, googleLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/items";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace(next);
    }
  }, [user, router, next]);

  function getErrorMessage(err) {
    const code = err?.code || "";
    if (code === "auth/email-already-in-use") {
      return "An account with this email already exists. Try logging in instead.";
    }
    if (code === "auth/weak-password") {
      return "Password must be at least 6 characters long.";
    }
    if (code === "auth/invalid-email") {
      return "Please enter a valid email address.";
    }
    if (code === "auth/popup-closed-by-user") {
      return "";
    }
    return err?.message || "Failed to create account. Please try again.";
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in your email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please check and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const userCredential = await signup(email, password);
      if (name.trim() && userCredential?.user) {
        try {
          await updateProfile(userCredential.user, {
            displayName: name.trim(),
          });
        } catch (profileError) {
          console.warn("Could not save display name:", profileError);
        }
      }
      router.push(next);
    } catch (err) {
      const msg = getErrorMessage(err);
      if (msg) setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignUp() {
    setError("");
    setIsSubmitting(true);
    try {
      await googleLogin();
      router.push(next);
    } catch (err) {
      const msg = getErrorMessage(err);
      if (msg) setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={styles.card}>
      <span className={styles.mark} aria-hidden="true">g</span>
      <span className={styles.eyebrow}>COME ON IN</span>
      <h1>There’s a seat <em>for you.</em></h1>
      <p className={styles.subtitle}>Join Gatherly to discover local communities, RSVP, and host gatherings.</p>

      <form className={styles.form} onSubmit={handleRegister}>
        {error && <div className={styles.error} role="alert">{error}</div>}

        <div className={styles.field}>
          <label htmlFor="register-name">Full name (optional)</label>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="register-password">Password (min. 6 characters)</label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="register-confirm">Confirm password</label>
          <input
            id="register-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Create your account"}
        </button>

        <div className={styles.divider}>or</div>

        <button
          className={styles.googleButton}
          type="button"
          onClick={handleGoogleSignUp}
          disabled={isSubmitting}
        >
          <GoogleIcon />
          <span>Sign up with Google</span>
        </button>
      </form>

      <div className={styles.links}>
        <Link href={`/login${next !== "/items" ? `?next=${encodeURIComponent(next)}` : ""}`}>
          Already a member? Log in
        </Link>
        <Link href="/items">Explore gatherings without signing in</Link>
      </div>
    </section>
  );
}

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <Suspense fallback={<div className={styles.card}>Loading…</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
