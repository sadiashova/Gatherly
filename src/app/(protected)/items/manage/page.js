"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteSavedItem } from "@/lib/items";
import useGatherings from "@/hooks/useGatherings";
import styles from "../protected.module.css";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

export default function ManageItemsPage() {
  const { items, error } = useGatherings();
  const [actionError, setActionError] = useState("");

  async function handleDelete(id, title) {
    if (!window.confirm(`Remove “${title}” from the gatherings list?`)) return;

    try {
      setActionError("");
      await deleteSavedItem(id);
    } catch (deleteError) {
      console.error("The gathering could not be removed.", deleteError);
      setActionError(deleteError.message || "We couldn’t remove that gathering. Please check your database connection and try again.");
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.manageHeading}>
          <div>
            <span className={styles.eyebrow}>YOUR GATHERLY SPACE</span>
            <h1>Manage <em>gatherings.</em></h1>
            <p>Keep your neighborhood plans in one happy place.</p>
          </div>
          <Link className={styles.submit} href="/items/add">Add a gathering <span aria-hidden="true">＋</span></Link>
        </header>
        {(error || actionError) && <p className={styles.error} role="alert">{error || actionError}</p>}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Gathering</th><th>Category</th><th>Date</th><th>Contribution</th><th><span className={styles.visuallyHidden}>Actions</span></th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td data-label="Gathering">
                    <span className={`${styles.tableIcon} ${styles[item.accent]}`} aria-hidden="true">{item.icon}</span>
                    <span className={styles.tableTitle}><strong>{item.title}</strong><small>{item.location}</small></span>
                  </td>
                  <td data-label="Category">{item.category}</td>
                  <td data-label="Date">{formatDate(item.date)}</td>
                  <td data-label="Contribution">{item.price === 0 ? "Free" : `$${item.price}`}</td>
                  <td data-label="Actions">
                    <div className={styles.rowActions}>
                      <Link href={`/items/${item.id}`}>View</Link>
                      <button onClick={() => handleDelete(item.id, item.title)} type="button">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && !error && (
            <div className={styles.emptyState}>
              <p>No gatherings on your list yet.</p>
              <Link href="/items/add">Add your first gathering</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
