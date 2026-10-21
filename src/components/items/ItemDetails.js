"use client";

import Link from "next/link";
import useGatherings from "@/hooks/useGatherings";
import styles from "./ItemDetails.module.css";

export default function ItemDetails({ id }) {
  const { items, error: storageError, loading } = useGatherings();
  const item = items.find((entry) => entry.id === id) || null;

  if (loading && !item) {
    return (
      <div className={styles.loading} role="status">
        Finding this good thing…
      </div>
    );
  }

  if (!item) {
    return (
      <div className={styles.notFound}>
        <span aria-hidden="true">☁</span>
        <h1>We couldn’t find that gathering.</h1>
        <p>{storageError || "It may have moved or been removed from the calendar."}</p>
        <Link href="/items">Back to all gatherings</Link>
      </div>
    );
  }

  const date = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${item.date}T12:00:00`));

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <Link className={styles.back} href="/items"><span aria-hidden="true">←</span> Back to gatherings</Link>
        <div className={styles.content}>
          <div className={`${styles.artwork} ${styles[item.accent]}`}>
            <span className={styles.artworkIcon} aria-hidden="true">{item.icon}</span>
            <span className={styles.artworkSparkle} aria-hidden="true">✦</span>
          </div>
          <article className={styles.details}>
            <span className={styles.category}>{item.category}</span>
            <h1>{item.title}</h1>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.infoList}>
              <div><span className={styles.infoIcon} aria-hidden="true">◷</span><span><small>When</small><strong>{date}</strong></span></div>
              <div><span className={styles.infoIcon} aria-hidden="true">⌖</span><span><small>Where</small><strong>{item.location}</strong></span></div>
              <div><span className={styles.infoIcon} aria-hidden="true">$</span><span><small>Contribution</small><strong>{item.price === 0 ? "Free to join" : `$${item.price} per person`}</strong></span></div>
            </div>
            <Link className={styles.joinButton} href="/items/add">Host something like this <span aria-hidden="true">↗</span></Link>
            <p className={styles.note}>Gatherly is about good company. Come as you are, and bring a friend if you’d like.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
