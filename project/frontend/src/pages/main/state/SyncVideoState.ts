import { ref, computed, ComputedRef, WritableComputedRef } from "vue";
import {
  IVideoPlayer,
  VideoType,
} from "@/pages/main/parts/video-area-parts/libs/IVideoPlayer";
import { DummyPlayer } from "@/pages/main/parts/video-area-parts/libs/DummyPlayer";

/**
 * 動画を同期させるための状態クラス
 * @returns
 */
interface ISyncVideoStateType {
  videoOwn: IVideoPlayer;
  videoTwo: IVideoPlayer;
  currentPosition: WritableComputedRef<number>;
  switchPlay(): void;
  switchMute(): void;
  switchRepeat(): void;
  adjustSpeed(speed: number): void;
  reload(): void;
  runSync(): void;
  stopSync(): void;
  subscription: {
    playing: ComputedRef<boolean>;
    muted: ComputedRef<boolean>;
    repeated: ComputedRef<boolean>;
    speed: ComputedRef<number>;
    synced: ComputedRef<boolean>;
    videoOwnType: ComputedRef<VideoType>;
    videoTwoType: ComputedRef<VideoType>;
  };
}

export class SyncVideoState implements ISyncVideoStateType {
  private _currentPosition = ref(0);
  private _videoOwnPlayer: IVideoPlayer = new DummyPlayer();
  private _videoOwnType = ref(VideoType.NONE);
  private _videoOwnStartPosition = 0;
  private _videoTwoPlayer: IVideoPlayer = new DummyPlayer();
  private _videoTwoType = ref(VideoType.NONE);
  private _videoTwoStartPosition = 0;
  private _playing = ref(false);
  private _muted = ref(false);
  private _repeated = ref(false);
  private _speed = ref(1);
  private _synced = ref(false);
  private _syncIntervalId = 0;

  get videoOwn() {
    return this._videoOwnPlayer;
  }
  set videoOwn(value: IVideoPlayer) {
    this._videoOwnType.value = value.getVideoType();
    this._videoOwnPlayer = value;
  }

  get videoTwo() {
    return this._videoTwoPlayer;
  }
  set videoTwo(value: IVideoPlayer) {
    this._videoTwoType.value = value.getVideoType();
    this._videoTwoPlayer = value;
  }

  currentPosition = computed({
    get: () => {
      return this._currentPosition.value;
    },
    set: (value) => {
      this._currentPosition.value = value;
    },
  });

  switchPlay = (): void => {
    this._playing.value = !this._playing.value;
    if (this._playing.value) {
      this._videoOwnPlayer.play();
      this._videoTwoPlayer.play();
    } else {
      this._videoOwnPlayer.stop();
      this._videoTwoPlayer.stop();
    }
  };

  switchMute = (): void => {
    this._muted.value = !this._muted.value;
  };

  switchRepeat = (): void => {
    this._repeated.value = !this._repeated.value;
  };

  adjustSpeed = (speed: number): void => {
    this._speed.value = speed;
  };

  switchSync = () => {
    this._synced.value = !this._synced.value;
  };

  reload = (): void => {};

  runSync = async () => {
    this._playing.value = false;
    this._synced.value = true;
    this._videoOwnStartPosition =
      await this._videoOwnPlayer.getCurrentPosition();
    this._videoTwoStartPosition =
      await this._videoTwoPlayer.getCurrentPosition();

    this._syncIntervalId = setInterval(async () => {
      const videoOwnCurrentPosition =
        await this._videoOwnPlayer.getCurrentPosition();
      const videoTwoCurrentPosition =
        await this._videoTwoPlayer.getCurrentPosition();
      // 開始ポジションより手前の場合は開始ポジションに戻す
      if (
        videoOwnCurrentPosition < this._videoOwnStartPosition ||
        videoTwoCurrentPosition < this._videoTwoStartPosition
      ) {
        this._videoOwnPlayer.seekTo(this._videoOwnStartPosition);
        this._videoTwoPlayer.seekTo(this._videoTwoStartPosition);
        return;
      }

      const videoOwnPosition =
        videoOwnCurrentPosition - this._videoOwnStartPosition;
      const videoTwoPosition =
        videoTwoCurrentPosition - this._videoTwoStartPosition;
      // 0.1秒以上ずれていたら同期させる
      const diff = Math.abs(videoOwnPosition - videoTwoPosition);
      if (diff >= 0.1) {
        videoOwnPosition > videoTwoPosition
          ? this._videoOwnPlayer.seekTo(diff * -1)
          : this._videoTwoPlayer.seekTo(diff * -1);
      }
    }, 500);
  };

  stopSync = (): void => {
    this._synced.value = false;
    clearInterval(this._syncIntervalId);
    this._syncIntervalId = 0;
  };

  get subscription() {
    return {
      playing: computed(() => {
        return this._playing.value;
      }),
      muted: computed(() => {
        return this._muted.value;
      }),
      repeated: computed(() => {
        return this._repeated.value;
      }),
      speed: computed(() => {
        return this._speed.value;
      }),
      synced: computed(() => {
        return this._synced.value;
      }),
      videoOwnType: computed(() => {
        return this._videoOwnType.value;
      }),
      videoTwoType: computed(() => {
        return this._videoTwoType.value;
      }),
    };
  }
}
