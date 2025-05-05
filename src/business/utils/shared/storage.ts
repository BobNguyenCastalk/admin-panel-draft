import { LOCAL_STORAGE_EXISTS, REFRESH_TOKEN } from "@constants/common/app";

export let storage: {
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setTokens: (tokens: { accessToken: string | null; refreshToken: string | null }) => void;
  clear: () => void;
};

export const createStorage = (autologinEnabled: boolean): void => {
  let accessToken: string | null = null;
  let refreshToken: string | null =
    autologinEnabled && LOCAL_STORAGE_EXISTS ? localStorage.getItem(REFRESH_TOKEN) : null;

  const setRefreshToken = (token: string | null): void => {
    if (token) {
      localStorage.setItem(REFRESH_TOKEN, token);
    } else {
      localStorage.removeItem(REFRESH_TOKEN);
    }

    refreshToken = token;
  };

  const setAccessToken = (token: string | null): void => {
    accessToken = token;
  };

  const getAccessToken = (): string | null => accessToken;
  const getRefreshToken = (): string | null => refreshToken;

  const setTokens = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string | null;
    refreshToken: string | null;
  }): void => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const clear = (): void => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  storage = {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    setTokens,
    clear,
  };
};
