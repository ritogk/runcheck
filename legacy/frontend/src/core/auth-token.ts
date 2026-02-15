let accessToken: string | null = null;
let youtubeAccessToken: string | null = null;

export const authToken = {
  get(): string | null {
    return accessToken;
  },
  set(token: string | null): void {
    accessToken = token;
  },
  clear(): void {
    accessToken = null;
  },
};

export const youtubeToken = {
  get(): string | null {
    return youtubeAccessToken;
  },
  set(token: string | null): void {
    youtubeAccessToken = token;
  },
  clear(): void {
    youtubeAccessToken = null;
  },
};
