import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createAuthSlice } from "./createAuthSlice";
import { createChannelSlice } from "./createChannelSlice";

export const useBoundStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createChannelSlice(...a),
    }),
    { name: "store" },
  ),
);
