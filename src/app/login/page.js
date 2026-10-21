"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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

function LoginForm() {
  const { user, login, googleLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/items";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace(next);
    }
  }, [user, router, next]);

  function getErrorMessage(err) {
    const code = err?.code || "";
    if (
      code === "auth/invalid-credential" ||
      code === "auth/user-not-found" ||
      code === "auth/wrong-password"
    ) {
      return "Incorrect email or password. Please try again.";
    }
    if (code === "auth/invalid-email") {
      return "Please enter a valid email address.";
    }
    if (code === "auth/too-many-requests") {
      return "Too many failed attempts. Please wait a moment and try again.";
    }
    if (code === "auth/popup-closed-by-user") {
      return "";
    }
    return err?.message || "Failed to sign in. Please try again.";
  }

  async function handleEmailLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push(next);
    } catch (err) {
      const msg = getErrorMessage(err);
      if (msg) setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
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
      <span className={styles.eyebrow}>WELCOME BACK</span>
      <h1>Your people are <em>right here.</em></h1>
      <p className={styles.subtitle}>Sign in to save gatherings, host your own events, and join the community.</p>

      <form className={styles.form} onSubmit={handleEmailLogin}>
        {error && <div className={styles.error} role="alert">{error}</div>}

        <div className={styles.field}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
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
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in to Gatherly"}
        </button>

        <div className={styles.divider}>or</div>

        <button
          className={styles.googleButton}
          type="button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      </form>

      <div className={styles.links}>
        <Link href={`/register${next !== "/items" ? `?next=${encodeURIComponent(next)}` : ""}`}>
          New to Gatherly? Create an account
        </Link>
        <Link href="/items">Explore gatherings without signing in</Link>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <Suspense fallback={<div className={styles.card}>Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
