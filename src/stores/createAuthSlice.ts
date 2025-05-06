import { AuthSliceI, IUserSlice } from "@dashboard/new-types";

export const createAuthSlice = (set): AuthSliceI => ({
  user: null,
  authenticated: false,
  authenticating: false,
  authErrors: [],
  setUser: (user: IUserSlice) => set({ user }),
  setAuthenticated: (authenticated: boolean) => set({ authenticated }),
  setAuthenticating: (authenticating: boolean) => set({ authenticating }),
  setAuthErrors: (authErrors: string[]) => set({ authErrors }),
});
