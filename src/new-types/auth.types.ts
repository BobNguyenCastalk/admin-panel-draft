export interface UserI {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
}

export interface SetUserI {
  setUser: (user: UserI) => void;
}

export interface AuthSliceI extends UserI, SetUserI {}
