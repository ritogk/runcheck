import { ref, computed, ComputedRef, WritableComputedRef } from "vue";
import { IVideoPlayer } from "@/pages/main/parts/video-area-parts/libs/IVideoPlayer";
import { PlayerManager } from "@/pages/main/parts/video-area-parts/libs/PlayerManager";

/**
 * 動画を同期させるための状態クラス
 * @returns
 */
interface ISyncVideoStateType {
  videoOwnManager: PlayerManager;
  videoTwoManager: PlayerManager;
  currentPosition: WritableComputedRef<number>;
  switchPlay(): void;
  switchMute(): void;
  switchRepeat(): void;
  adjustSpeed(speed: number): void;
  reload(): void;
  runSync(): void;
  stopSync(): void;
  subscription: {
    videoOwn: ComputedRef<IVideoPlayer>;
    videoTwo: ComputedRef<IVideoPlayer>;
    playing: ComputedRef<boolean>;
    muted: ComputedRef<boolean>;
    repeated: ComputedRef<boolean>;
    speed: ComputedRef<number>;
    synced: ComputedRef<boolean>;
  };
}

export class SyncVideoState implements ISyncVideoStateType {
  private _currentPosition = ref(0);
  private _videoOneManager: PlayerManager;
  private _videoOwnStartPosition = 0;
  private _videoTwoManager: PlayerManager;
  private _videoTwoStartPosition = 0;
  private _playing = ref(false);
  private _muted = ref(true);
  private _repeated = ref(false);
  private _speed = ref(1);
  private _synced = ref(false);
  private _syncIntervalId = 0;

  constructor() {
    this._videoOneManager = new PlayerManager();
    this._videoTwoManager = new PlayerManager();
  }

  get videoOwnManager() {
    return this._videoOneManager;
  }

  get videoTwoManager() {
    return this._videoTwoManager;
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
      this._videoOneManager.subscription.player.value.play();
      this._videoTwoManager.subscription.player.value.play();
    } else {
      this._videoOneManager.subscription.player.value.stop();
      this._videoTwoManager.subscription.player.value.stop();
    }
  };

  switchMute = (): void => {
    this._muted.value = !this._muted.value;
    if (this._muted.value) {
      this._videoOneManager.subscription.player.value.mute();
      this._videoTwoManager.subscription.player.value.mute();
    } else {
      this._videoOneManager.subscription.player.value.unMute();
      this._videoTwoManager.subscription.player.value.unMute();
    }
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

  reload = (): void => {
    this._playing.value = false;
    this._videoOneManager.subscription.player.value.seekTo(
      this._videoOwnStartPosition
    );
    this._videoTwoManager.subscription.player.value.seekTo(
      this._videoTwoStartPosition
    );
  };

  runSync = async () => {
    this._playing.value = false;
    this._synced.value = true;
    this._videoOwnStartPosition =
      await this._videoOneManager.subscription.player.value.getCurrentPosition();
    this._videoTwoStartPosition =
      await this._videoTwoManager.subscription.player.value.getCurrentPosition();

    this._syncIntervalId = setInterval(async () => {
      const videoOwnCurrentPosition =
        await this._videoOneManager.subscription.player.value.getCurrentPosition();
      const videoTwoCurrentPosition =
        await this._videoTwoManager.subscription.player.value.getCurrentPosition();
      // 開始ポジションより手前の場合は開始ポジションに戻す
      if (
        videoOwnCurrentPosition < this._videoOwnStartPosition ||
        videoTwoCurrentPosition < this._videoTwoStartPosition
      ) {
        this._videoOneManager.subscription.player.value.seekTo(
          this._videoOwnStartPosition
        );
        this._videoTwoManager.subscription.player.value.seekTo(
          this._videoTwoStartPosition
        );
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
          ? this._videoOneManager.subscription.player.value.seekTo(
              videoOwnCurrentPosition + diff * -1
            )
          : this._videoTwoManager.subscription.player.value.seekTo(
              videoTwoCurrentPosition + diff * -1
            );
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
      videoOwn: computed(() => {
        return this._videoOneManager.subscription.player.value;
      }),
      videoTwo: computed(() => {
        return this._videoTwoManager.subscription.player.value;
      }),
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
    };
  }
}
