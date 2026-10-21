"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./Navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Discover" },
  { href: "/about", label: "Our story" },
  { href: "/items/add", label: "Host a gathering" },
  { href: "/items/manage", label: "Manage" },
];

function PrimaryLinks({ pathname, onNavigate }) {
  return (
    <div className={styles.links}>
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(`${link.href}/`));
        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={isActive ? styles.activeLink : ""}
            href={link.href}
            key={link.href}
            onClick={onNavigate}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

function CurrentNavigationLinks({ onNavigate }) {
  const pathname = usePathname();
  return <PrimaryLinks onNavigate={onNavigate} pathname={pathname} />;
}

export default function Navbar() {
  const { user, logout, authError } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleSignOut() {
    try {
      if (logout) {
        await logout();
      }
      setMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Sign out failed.", error);
      setNotice("Could not sign out. Please try again.");
    }
  }

  function closeMenu() {
    setMenuOpen(false);
    setNotice("");
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.brand} href="/" aria-label="Gatherly home" onClick={closeMenu}>
          <span className={styles.brandMark} aria-hidden="true">g</span>
          <span>gatherly<span className={styles.brandDot}>.</span></span>
        </Link>

        <button
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>

        <nav
          className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <Suspense fallback={<PrimaryLinks onNavigate={closeMenu} />}>
            <CurrentNavigationLinks onNavigate={closeMenu} />
          </Suspense>
          <div className={styles.actions}>
            {user ? (
              <>
                <span className={styles.userLabel} title={user.email || "Signed in"}>
                  Hi, {user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "friend"}
                </span>
                <button className={styles.loginButton} onClick={handleSignOut} type="button">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link className={styles.loginButton} href="/login" onClick={closeMenu}>Log in</Link>
                <Link className={styles.joinButton} href="/register" onClick={closeMenu}>
                  Join for free <span aria-hidden="true">↗</span>
                </Link>
              </>
            )}
          </div>
          {(notice || authError) && <p className={styles.notice} role="status">{notice || authError}</p>}
        </nav>
      </div>
    </header>
  );
}
