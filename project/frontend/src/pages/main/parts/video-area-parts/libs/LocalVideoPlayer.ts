import { computed } from "vue";
import { IVideoPlayer, VideoType, Status } from "./IVideoPlayer";

export class LocalVideoPlayer implements IVideoPlayer {
  private videoElement: HTMLVideoElement;
  constructor(videoElement: HTMLVideoElement, objectURL: string) {
    videoElement.src = objectURL;
    videoElement.load();
    this.videoElement = videoElement;
  }

  get videoType() {
    return VideoType.LOCAL;
  }

  changeVideo(url: string): void {
    this.videoElement.src = url;
    this.videoElement.load();
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

  get subscription() {
    return {
      status: computed(() => {
        return Status.WAITING;
      }),
      videoType: computed(() => {
        return VideoType.LOCAL;
      }),
    };
  }
}
