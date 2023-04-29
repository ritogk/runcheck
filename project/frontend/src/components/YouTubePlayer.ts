import { IVideoPlayer } from "./IVideoPlayer";
import YPlayer from "youtube-player";
import { YouTubePlayer as YouTubePlayerType } from "node_modules/@types/youtube-player/dist/types";

export class YouTubePlayer implements IVideoPlayer {
  private player: YouTubePlayerType;
  constructor(elementId: string, youtubeUrl: string) {
    this.player = YPlayer(elementId);
    this.player.loadVideoByUrl(youtubeUrl);
    this.player.stopVideo();
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

  destory(): void {
    this.player.destroy();
  }
}
