import { InjectionKey, ref, computed, ComputedRef } from "vue";
import { IVideoPlayer } from "./IVideoPlayer";
/**
 * 動画を動悸するためのフック
 * @returns
 */
interface SyncVideoStateType {
  switchMute(): void;
  switchRepeat(): void;
  adjustSpeed(speed: number): void;
  reload(): void;
  switchSync(): void;
  setCurrentPosition(progres: number): void;
  getCurrentPosition(): ComputedRef<number>;
  setVideo1(videoPlayer: any): void;
  getVideo1(): any;
  setVideo2(videoPlayer: any): void;
  getVideo2(): any;
}

class SyncVideoState implements SyncVideoStateType {
  private currentPosition = ref(0);
  private muted = false;
  private repeated = false;
  private speed = 1;
  private synced = false;
  private video1Player;
  private video2Player;
  constructor(video1Player: IVideoPlayer, video2Player: IVideoPlayer) {
    this.video1Player = video1Player;
    this.video2Player = video2Player;
    setInterval(this.sync, 500);
  }

  switchMute = (): void => {
    this.muted = !this.muted;
  };

  switchRepeat = (): void => {
    this.repeated = !this.repeated;
  };

  adjustSpeed = (speed: number): void => {
    this.speed = speed;
  };

  reload = (): void => {};

  switchSync = () => {
    this.synced = !this.synced;
  };

  private sync = () => {
    if (!this.synced) return;
    // 動画の進捗値を取得
    const video1CurrentPosition = 1;
    const video2CurrentPosition = 2;
    // ズレを補正する
  };

  setCurrentPosition = (progres: number) => {
    this.currentPosition.value = progres;
  };
  getCurrentPosition = (): ComputedRef<number> => {
    return computed(() => this.currentPosition.value);
  };

  setVideo1 = (videoPlayer: IVideoPlayer) => {
    this.video1Player = videoPlayer;
  };
  getVideo1 = (): IVideoPlayer => {
    return this.video1Player;
  };

  setVideo2 = (videoPlayer: IVideoPlayer) => {
    this.video2Player = videoPlayer;
  };
  getVideo2 = (): IVideoPlayer => {
    return this.video2Player;
  };
}

const syncVideoStateKey: InjectionKey<SyncVideoStateType> =
  Symbol("SyncVideoStateType");

export { SyncVideoState, syncVideoStateKey };
