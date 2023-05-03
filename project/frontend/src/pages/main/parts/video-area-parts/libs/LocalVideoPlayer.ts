import { IVideoPlayer, VideoType } from "./IVideoPlayer";

export class LocalVideoPlayer implements IVideoPlayer {
  private videoElement: HTMLVideoElement;
  constructor(videoElement: HTMLVideoElement, objectURL: string) {
    videoElement.src = objectURL;
    videoElement.load();
    this.videoElement = videoElement;
  }

  play = () => {
    this.videoElement.play();
  };

  stop = () => {
    this.videoElement.pause();
  };

  mute = () => {
    this.videoElement.muted = true;
  };

  unMute = () => {
    this.videoElement.muted = false;
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

  seekTo = async (seconds: number) => {
    this.videoElement.currentTime = seconds;
  };

  getCurrentPosition = async (): Promise<number> => {
    return Promise.resolve(this.videoElement.currentTime);
  };

  setCurrentPosition = (currentPosition: number) => {
    return;
  };

  async destory(): Promise<void> {
    this.videoElement.src = "";
    return;
  }

  getVideoType = (): VideoType => {
    return VideoType.LOCAL;
  };
}
