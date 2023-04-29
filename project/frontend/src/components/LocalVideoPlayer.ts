import { IVideoPlayer } from "./IVideoPlayer";

export class LocalVideoPlayer implements IVideoPlayer {
  private path: string;
  constructor(path: string) {
    this.path = path;
  }

  play = () => {
    return;
  };

  stop = () => {
    return;
  };

  mute = () => {
    return;
  };

  unMute = () => {
    return;
  };

  adjustSpeed = (speed: number) => {
    return;
  };

  enableRepeat = () => {
    return;
  };

  disableRepeat = () => {
    return;
  };

  getCurrentPosition = (): number => {
    return 1;
  };

  setCurrentPosition = (currentPosition: number) => {
    return;
  };

  destory(): void {}
}
