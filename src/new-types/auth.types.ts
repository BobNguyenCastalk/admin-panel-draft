export interface UserI {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  authenticated: boolean;
  authenticating: boolean;
}

export interface SetUserI {
  setUser: (user: UserI) => void;
}

export interface SetAuthenticatedI {
  setAuthenticated: (authenticated: boolean) => void;
}

export interface SetAuthenticatingI {
  setAuthenticating: (authenticating: boolean) => void;
}

export interface AuthSliceI extends UserI, SetUserI, SetAuthenticatedI, SetAuthenticatingI {}
