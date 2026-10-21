import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <Link className={styles.brand} href="/">
              <span className={styles.brandMark} aria-hidden="true">g</span>
              <span>gatherly<span className={styles.brandDot}>.</span></span>
            </Link>
            <p>Good things happen when we get together.</p>
          </div>
          <div className={styles.footerLinks}>
            <div>
              <span className={styles.label}>Explore</span>
              <Link href="/items">Find gatherings</Link>
              <Link href="/about">Our story</Link>
              <Link href="/items/add">Host a gathering</Link>
            </div>
            <div>
              <span className={styles.label}>Your space</span>
              <Link href="/login">Log in</Link>
              <Link href="/register">Create an account</Link>
              <Link href="/items/manage">Manage gatherings</Link>
            </div>
            <div>
              <span className={styles.label}>Connect</span>
              <a
                href="https://www.linkedin.com/in/sadia-zaman-b5861b2ba"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://www.facebook.com/sadia.zaman.7393264"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://www.instagram.com/sadia._.zaman/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>
            © Gatherly. Built with ❤️ by{" "}
            <a
              className={styles.creatorLink}
              href="https://www.linkedin.com/in/sadia-zaman-b5861b2ba"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sadia Zaman
            </a>
          </span>
          <span>Small plans. Big memories.</span>
        </div>
      </div>
    </footer>
  );
}
