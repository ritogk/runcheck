const ACCESS_TOKEN_KEY = "accessToken";
const YOUTUBE_TOKEN_KEY = "youtubeAccessToken";

export const authToken = {
  get(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  set(token: string | null): void {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },
  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export const youtubeToken = {
  get(): string | null {
    return localStorage.getItem(YOUTUBE_TOKEN_KEY);
  },
  set(token: string | null): void {
    if (token) {
      localStorage.setItem(YOUTUBE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(YOUTUBE_TOKEN_KEY);
    }
  },
  clear(): void {
    localStorage.removeItem(YOUTUBE_TOKEN_KEY);
  },
};
