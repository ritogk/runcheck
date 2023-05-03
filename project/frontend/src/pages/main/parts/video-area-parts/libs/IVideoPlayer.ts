import { ComputedRef } from "vue";
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
  subscription: {
    status: ComputedRef<Status>;
  };
}

export enum VideoType {
  YOUTUBE,
  LOCAL,
  NONE,
}

export enum Status {
  WAITING, // 読み込み中
  CAN_PLAY, // 再生可能な状態
  PLAYING, // 再生中
  PAUSE, // ポーズ
  ENDED, // 終了
}
