import { ref, computed, ComputedRef, WritableComputedRef } from "vue";
import { IVideoPlayer } from "@/pages/main/parts/video-area-parts/libs/IVideoPlayer";
import { PlayerSwitcher } from "@/pages/main/parts/video-area-parts/libs/PlayerSwitcher";

/**
 * 動画を同期させるための状態クラス
 * @returns
 */
interface ISyncVideoStateType {
  videoOwnSwitcher: PlayerSwitcher;
  videoTwoSwitcher: PlayerSwitcher;
  currentPosition: WritableComputedRef<number>;
  switchPlay(): void;
  switchMute(): void;
  switchRepeat(): void;
  adjustSpeed(speed: number): void;
  reload(): void;
  runSync(): void;
  stopSync(): void;
  subscription: {
    // videoOwn: ComputedRef<IVideoPlayer>;
    // videoTwo: ComputedRef<IVideoPlayer>;
    playing: ComputedRef<boolean>;
    muted: ComputedRef<boolean>;
    repeated: ComputedRef<boolean>;
    speed: ComputedRef<number>;
    synced: ComputedRef<boolean>;
  };
}

export class SyncVideoState implements ISyncVideoStateType {
  private _currentPosition = ref(0);
  private _videoOwnSwitcher: PlayerSwitcher;
  private _videoOwnStartPosition = 0;
  private _videoTwoSwitcher: PlayerSwitcher;
  private _videoTwoStartPosition = 0;
  private _playing = ref(false);
  private _muted = ref(true);
  private _repeated = ref(false);
  private _speed = ref(1);
  private _synced = ref(false);
  private _syncIntervalId = 0;

  constructor() {
    this._videoOwnSwitcher = new PlayerSwitcher();
    this._videoTwoSwitcher = new PlayerSwitcher();
  }

  get videoOwnSwitcher() {
    return this._videoOwnSwitcher;
  }

  get videoTwoSwitcher() {
    return this._videoTwoSwitcher;
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
      this._videoOwnSwitcher.subscription.player.value.play();
      this._videoTwoSwitcher.subscription.player.value.play();
    } else {
      this._videoOwnSwitcher.subscription.player.value.stop();
      this._videoTwoSwitcher.subscription.player.value.stop();
    }
  };

  switchMute = (): void => {
    this._muted.value = !this._muted.value;
    if (this._muted.value) {
      this._videoOwnSwitcher.subscription.player.value.mute();
      this._videoTwoSwitcher.subscription.player.value.mute();
    } else {
      this._videoOwnSwitcher.subscription.player.value.unMute();
      this._videoTwoSwitcher.subscription.player.value.unMute();
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
    this._videoOwnSwitcher.subscription.player.value.seekTo(
      this._videoOwnStartPosition
    );
    this._videoTwoSwitcher.subscription.player.value.seekTo(
      this._videoTwoStartPosition
    );
  };

  runSync = async () => {
    this._playing.value = false;
    this._synced.value = true;
    this._videoOwnStartPosition =
      await this._videoOwnSwitcher.subscription.player.value.getCurrentPosition();
    this._videoTwoStartPosition =
      await this._videoTwoSwitcher.subscription.player.value.getCurrentPosition();

    this._syncIntervalId = setInterval(async () => {
      const videoOwnCurrentPosition =
        await this._videoOwnSwitcher.subscription.player.value.getCurrentPosition();
      const videoTwoCurrentPosition =
        await this._videoTwoSwitcher.subscription.player.value.getCurrentPosition();
      // 開始ポジションより手前の場合は開始ポジションに戻す
      if (
        videoOwnCurrentPosition < this._videoOwnStartPosition ||
        videoTwoCurrentPosition < this._videoTwoStartPosition
      ) {
        this._videoOwnSwitcher.subscription.player.value.seekTo(
          this._videoOwnStartPosition
        );
        this._videoTwoSwitcher.subscription.player.value.seekTo(
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
          ? this._videoOwnSwitcher.subscription.player.value.seekTo(
              videoOwnCurrentPosition + diff * -1
            )
          : this._videoTwoSwitcher.subscription.player.value.seekTo(
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
      // videoOwn: computed(() => {
      //   return this._videoOwnSwitcher.subscription.player.value;
      // }),
      // videoTwo: computed(() => {
      //   return this._videoTwoSwitcher.subscription.player.value;
      // }),
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
