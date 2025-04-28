import { AuthSliceI, UserI } from "@dashboard/new-types";

export const createAuthSlice = (set): AuthSliceI => ({
  user: null,
  authenticated: false,
  authenticating: false,
  setUser: (user: UserI) => set({ user }),
  setAuthenticated: (authenticated: boolean) => set({ authenticated }),
  setAuthenticating: (authenticating: boolean) => set({ authenticating }),
});
