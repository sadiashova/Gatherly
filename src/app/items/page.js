"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { defaultItems } from "@/lib/items";
import useGatherings from "@/hooks/useGatherings";
import styles from "./items.module.css";

const categories = ["All categories", ...new Set(defaultItems.map((item) => item.category))];

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(`${value}T12:00:00`));
}

export default function ItemsPage() {
  const { items, error: storageError } = useGatherings();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [price, setPrice] = useState("All prices");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch = !query || [item.title, item.description, item.location, item.category]
        .some((value) => value.toLowerCase().includes(query));
      const matchesCategory = category === "All categories" || item.category === category;
      const matchesPrice = price === "All prices"
        || (price === "Free" ? item.price === 0 : item.price > 0);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [category, items, price, search]);

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <span className={styles.eyebrow}>GOOD COMPANY IS CLOSER THAN YOU THINK</span>
        <h1>Find your next <em>good thing.</em></h1>
        <p>Thoughtful gatherings, lovely little discoveries, and new faces just around the corner.</p>
      </section>

      <section className={styles.catalog} aria-label="Gathering directory">
        <div className={styles.toolbar}>
          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <span className={styles.visuallyHidden}>Search gatherings</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, place, or interest..."
            />
          </label>
          <div className={styles.filters}>
            <label>
              <span className={styles.visuallyHidden}>Filter by category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label>
              <span className={styles.visuallyHidden}>Filter by price</span>
              <select value={price} onChange={(event) => setPrice(event.target.value)}>
                {["All prices", "Free", "Paid"].map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          </div>
        </div>

        {storageError && <p className={styles.error} role="alert">{storageError}</p>}
        <div className={styles.resultLine}>
          <span><strong>{filteredItems.length}</strong> gatherings to explore</span>
          {(search || category !== "All categories" || price !== "All prices") && (
            <button
              className={styles.reset}
              onClick={() => { setSearch(""); setCategory("All categories"); setPrice("All prices"); }}
              type="button"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredItems.length > 0 ? (
          <div className={styles.grid}>
            {filteredItems.map((item) => (
              <article className={styles.card} key={item.id}>
                <div className={`${styles.artwork} ${styles[item.accent]}`}>
                  <span className={styles.date}>{formatDate(item.date)}</span>
                  <span className={styles.icon} aria-hidden="true">{item.icon}</span>
                  <span className={styles.sparkle} aria-hidden="true">✦</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.category}>{item.category}</span>
                  <h2>{item.title}</h2>
                  <p className={styles.description}>{item.description}</p>
                  <div className={styles.cardMeta}>
                    <span><span aria-hidden="true">⌖</span> {item.location}</span>
                    <span>{item.price === 0 ? "Free" : `$${item.price}`}</span>
                  </div>
                  <Link className={styles.viewButton} href={`/items/${item.id}`}>
                    View details <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span aria-hidden="true">☁</span>
            <h2>No gatherings found just yet.</h2>
            <p>Try a different search or clear your filters to see what’s happening nearby.</p>
          </div>
        )}
      </section>
    </div>
  );
}
