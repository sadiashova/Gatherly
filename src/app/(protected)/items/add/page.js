"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addSavedItem } from "@/lib/items";
import styles from "../protected.module.css";

const itemCategories = [
  "Coffee & conversation",
  "Outdoors",
  "Music",
  "Arts & crafts",
  "Books",
  "Food & drink",
];

function getToday() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export default function AddItemPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const category = String(formData.get("category") || "");
    const location = String(formData.get("location") || "").trim();
    const date = String(formData.get("date") || "");
    const price = Number(formData.get("price"));

    if (!title || !description || !location || !date || !Number.isFinite(price) || price < 0) {
      setError("Please complete each field with a valid price.");
      setSaving(false);
      return;
    }

    if (date < getToday()) {
      setError("Choose a date that hasn’t passed yet.");
      setSaving(false);
      return;
    }

    try {
      const accentByCategory = {
        "Coffee & conversation": "sage",
        Outdoors: "peach",
        Music: "lavender",
        "Arts & crafts": "clay",
        Books: "butter",
        "Food & drink": "rose",
      };
      const iconByCategory = {
        "Coffee & conversation": "☕",
        Outdoors: "✿",
        Music: "♫",
        "Arts & crafts": "◒",
        Books: "▤",
        "Food & drink": "♨",
      };
      await addSavedItem({
        id: `gathering-${crypto.randomUUID()}`,
        title,
        description,
        category,
        location,
        date,
        price,
        accent: accentByCategory[category] || "sage",
        icon: iconByCategory[category] || "✳",
      });
      form.reset();
      setMessage("Your gathering is on the calendar. Nice one!");
    } catch (saveError) {
      console.error("The new gathering could not be saved.", saveError);
      setError(saveError.message || "We couldn’t save this gathering to the database. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <Link className={styles.back} href="/items">← Back to gatherings</Link>
        <header className={styles.heading}>
          <span className={styles.eyebrow}>MAKE THE FIRST MOVE</span>
          <h1>Host a little <em>something.</em></h1>
          <p>Good plans start with someone saying, “Come on over.”</p>
        </header>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="title">Gathering name</label>
            <input id="title" name="title" maxLength={80} placeholder="e.g. The Sunday coffee club" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="description">A little about it</label>
            <textarea id="description" name="description" maxLength={280} placeholder="What should people look forward to?" required rows={4} />
          </div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" defaultValue={itemCategories[0]} required>
                {itemCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" required />
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="location">Where</label>
              <input id="location" name="location" maxLength={100} placeholder="Place name · Neighborhood" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="price">Contribution (USD)</label>
              <input id="price" name="price" type="number" min="0" max="10000" step="0.01" placeholder="0 for free" required />
            </div>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          {message && <p className={styles.success} role="status">{message}</p>}
          <div className={styles.formActions}>
            <button className={styles.submit} disabled={saving} type="submit">{saving ? "Adding…" : "Add gathering"} <span aria-hidden="true">↗</span></button>
            <button className={styles.cancel} onClick={() => router.push("/items/manage")} type="button">Manage gatherings</button>
          </div>
        </form>
      </div>
    </div>
  );
}
