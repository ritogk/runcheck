export interface IVideoPlayer {
  play(): void
  stop(): void
  mute(): void
  unMute(): void
  adjustSpeed(speed: number): void
  enableRepeat(): void
  disableRepeat(): void
  getCurrentPosition(): number
  setCurrentPosition(currentPosition: number): void
}
