import { IVideoPlayer } from "./IVideoPlayer";

export class LocalVideoPlayer implements IVideoPlayer {
  private videoElement: HTMLVideoElement;
  constructor(videoElement: HTMLVideoElement, objectURL: string) {
    videoElement.src = objectURL;
    videoElement.load();
    this.videoElement = videoElement;
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

  destory(): Promise<void> {
    return null as any;
  }
}
