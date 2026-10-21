export const defaultItems = [
  {
    id: "slow-sunday-coffee",
    title: "The slow Sunday coffee club",
    category: "Coffee & conversation",
    location: "Moss & Maple · Riverside",
    date: "2026-11-08",
    price: 8,
    icon: "☕",
    accent: "sage",
    description: "A no-rush morning of good coffee, thoughtful conversation, and new neighborhood friends.",
  },
  {
    id: "flowers-and-lunch",
    title: "Flowers, friends & a long lunch",
    category: "Outdoors",
    location: "The Conservatory · Old Town",
    date: "2026-11-14",
    price: 18,
    icon: "✿",
    accent: "peach",
    description: "Gather a few stems, learn the art of a loose bouquet, then linger over a seasonal lunch.",
  },
  {
    id: "tiny-desk-concerts",
    title: "An evening of tiny desk concerts",
    category: "Music",
    location: "Goodland Studio · Downtown",
    date: "2026-11-19",
    price: 12,
    icon: "♫",
    accent: "lavender",
    description: "Intimate live sets from local musicians, with plenty of space to discover your new favorite.",
  },
  {
    id: "clay-and-chai",
    title: "Clay, chai & a little creativity",
    category: "Arts & crafts",
    location: "Common Ground · Eastwood",
    date: "2026-11-22",
    price: 24,
    icon: "◒",
    accent: "clay",
    description: "Try hand-building pottery in a relaxed beginner workshop, with a warm cup of chai included.",
  },
  {
    id: "bookshop-after-hours",
    title: "Bookshop after hours",
    category: "Books",
    location: "Paper Trail Books · Northside",
    date: "2026-11-27",
    price: 0,
    icon: "▤",
    accent: "butter",
    description: "Swap a favorite read, meet fellow book people, and browse the shelves after closing time.",
  },
  {
    id: "neighborhood-table",
    title: "The neighborhood table",
    category: "Food & drink",
    location: "Juniper Kitchen · South End",
    date: "2026-12-03",
    price: 16,
    icon: "♨",
    accent: "rose",
    description: "Pull up a chair for a family-style supper made with ingredients from nearby growers.",
  },
  {
    id: "morning-trail-walk",
    title: "A little morning trail walk",
    category: "Outdoors",
    location: "Willow Creek Trail · Riverside",
    date: "2026-12-06",
    price: 0,
    icon: "⌁",
    accent: "sage",
    description: "An easy-paced walk, fresh air, and a friendly group to help you start the weekend well.",
  },
  {
    id: "write-together",
    title: "Write together, quietly",
    category: "Arts & crafts",
    location: "The Nook · Old Town",
    date: "2026-12-12",
    price: 5,
    icon: "✎",
    accent: "lavender",
    description: "Bring a notebook and enjoy a gentle writing prompt, a little focus, and good company.",
  },
];

let store = {
  items: defaultItems,
  error: "",
  loading: false,
};

const serverSnapshot = {
  items: defaultItems,
  error: "",
  loading: false,
};

const listeners = new Set();
let isFetching = false;
let hasInitialFetch = false;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export async function fetchGatherings() {
  if (isFetching || typeof window === "undefined") return;
  isFetching = true;

  try {
    const res = await fetch("/api/items");
    if (!res.ok) throw new Error("Could not load from database");
    const data = await res.json();
    if (data.items && Array.isArray(data.items)) {
      store = { items: data.items, error: "", loading: false };
      emitChange();
    }
  } catch (err) {
    console.warn("MongoDB fetch warning, using fallback items:", err);
    store = { ...store, error: err.message || "Failed to sync with database", loading: false };
    emitChange();
  } finally {
    isFetching = false;
  }
}

export function subscribeToGatherings(listener) {
  listeners.add(listener);
  if (!hasInitialFetch) {
    hasInitialFetch = true;
    fetchGatherings();
  }
  return () => {
    listeners.delete(listener);
  };
}

export function getGatheringsSnapshot() {
  return store;
}

export function getServerGatheringsSnapshot() {
  return serverSnapshot;
}

export async function addSavedItem(item) {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to save gathering to database.");
  }

  await fetchGatherings();
  return response.json();
}

export async function deleteSavedItem(id) {
  const response = await fetch(`/api/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete gathering from database.");
  }

  await fetchGatherings();
  return response.json();
}
