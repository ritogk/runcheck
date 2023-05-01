import { IVideoPlayer, VideoType } from "./IVideoPlayer";

export class DummyPlayer implements IVideoPlayer {
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

  async destory(): Promise<void> {
    return;
  }

  getVideoType = (): VideoType => {
    return VideoType.NONE;
  };
}
