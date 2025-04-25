import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createAuthSlice } from "./createAuthSlice";

export const useBoundStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    { name: "store" },
  ),
);
