"use client";

import { useSyncExternalStore } from "react";
import {
  getGatheringsSnapshot,
  getServerGatheringsSnapshot,
  subscribeToGatherings,
} from "@/lib/items";

export default function useGatherings() {
  return useSyncExternalStore(
    subscribeToGatherings,
    getGatheringsSnapshot,
    getServerGatheringsSnapshot,
  );
}

