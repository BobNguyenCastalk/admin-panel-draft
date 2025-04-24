import { AuthSliceI, UserI } from "@dashboard/new-types";

export const createAuthSlice = (set): AuthSliceI => ({
  user: null,
  setUser: (user: UserI) => set({ user }),
});
