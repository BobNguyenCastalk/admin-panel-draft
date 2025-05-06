import { create } from "zustand";

import { createAuthSlice } from "./createAuthSlice";
import { createChannelSlice } from "./createChannelSlice";

export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createChannelSlice(...a),
}));
