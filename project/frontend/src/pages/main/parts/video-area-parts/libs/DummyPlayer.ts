import { computed } from "vue";
import { IVideoPlayer, VideoType, Status } from "./IVideoPlayer";

export class DummyPlayer implements IVideoPlayer {
  get videoType() {
    return VideoType.NONE;
  }

  changeVideo(url: string): void {}

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

  seekTo(seconds: number): void {}

  getCurrentPosition = async (): Promise<number> => {
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

  get subscription() {
    return {
      status: computed(() => {
        return Status.WAITING;
      }),
    };
  }
}
