import { ComputedRef } from "vue"
export interface IVideoPlayer {
  videoType: VideoType
  load(): Promise<void>
  changeVideo(url: string): void
  play(): Promise<void>
  stop(): Promise<void>
  mute(): Promise<void>
  unMute(): void
  adjustSpeed(speed: number): void
  enableRepeat(): void
  disableRepeat(): void
  seekTo(seconds: number): Promise<void>
  getCurrentPosition(): Promise<number>
  getDuration(): Promise<number>
  getPath(): Promise<string>
  destory(): Promise<void>
  subscription: {
    status: ComputedRef<Status>
  }
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
