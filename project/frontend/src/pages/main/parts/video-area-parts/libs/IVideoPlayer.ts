export interface IVideoPlayer {
  play(): void;
  stop(): void;
  mute(): void;
  unMute(): void;
  adjustSpeed(speed: number): void;
  enableRepeat(): void;
  disableRepeat(): void;
  seekTo(seconds: number): void;
  getCurrentPosition(): Promise<number>;
  setCurrentPosition(currentPosition: number): void;
  destory(): Promise<void>;
  getVideoType(): VideoType;
}

export enum VideoType {
  YOUTUBE,
  LOCAL,
  NONE,
}
