import {
  ref,
  computed,
  ComputedRef,
  WritableComputedRef,
  watchEffect,
  Ref,
} from "vue";
import {
  IVideoPlayer,
  Status,
} from "@/pages/main/parts/video-area-parts/libs/IVideoPlayer";
import { PlayerManager } from "@/pages/main/parts/video-area-parts/libs/PlayerManager";

/**
 * 動画を同期させるための状態クラス
 * @returns
 */
interface ISyncPlayerStateType {
  diff: Ref<{ abs: number; own: number; two: number }[]>;
  playerOneManager: PlayerManager;
  playerTwoManager: PlayerManager;
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

export class SyncPlayerState implements ISyncPlayerStateType {
  public diff = ref([{ abs: 0, own: 0, two: 0 }]);
  private _currentPosition = ref(0);
  private _playerOneManager: PlayerManager;
  private _playerOneStartPosition = 0;
  private _playerTwoManager: PlayerManager;
  private _playerTwoStartPosition = 0;
  private _playing = ref(false);
  private _muted = ref(true);
  private _repeated = ref(false);
  private _speed = ref(1);
  private _synced = ref(false);
  private _syncIntervalId = 0;

  constructor() {
    this._playerOneManager = new PlayerManager();
    this._playerTwoManager = new PlayerManager();
  }

  get playerOneManager() {
    return this._playerOneManager;
  }

  get playerTwoManager() {
    return this._playerTwoManager;
  }

  currentPosition = computed({
    get: () => {
      return this._currentPosition.value;
    },
    set: (value) => {
      this._currentPosition.value = value;
    },
  });

  switchPlay = async () => {
    this._playing.value = !this._playing.value;
    if (this._playing.value) {
      this._playerOneManager.subscription.player.value.play();
      this._playerTwoManager.subscription.player.value.play();
    } else {
      await Promise.all([
        this._playerOneManager.subscription.player.value.stop(),
        this._playerTwoManager.subscription.player.value.stop(),
      ]);
    }
    return;
  };

  switchMute = (): void => {
    this._muted.value = !this._muted.value;
    if (this._muted.value) {
      this._playerOneManager.subscription.player.value.mute();
      this._playerTwoManager.subscription.player.value.mute();
    } else {
      this._playerOneManager.subscription.player.value.unMute();
      this._playerTwoManager.subscription.player.value.unMute();
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

  reload = async () => {
    await this._playerOneManager.subscription.player.value.mute();
    await this._playerTwoManager.subscription.player.value.mute();
    this._muted.value = true;
    await this._playerOneManager.subscription.player.value.stop();
    await this._playerTwoManager.subscription.player.value.stop();
    this._playing.value = false;
    await this._playerOneManager.subscription.player.value.seekTo(
      this._playerOneStartPosition
    );
    await this._playerTwoManager.subscription.player.value.seekTo(
      this._playerTwoStartPosition
    );
    await this._playerOneManager.subscription.player.value.play();
    await this._playerTwoManager.subscription.player.value.play();
    this._playing.value = true;
  };

  private syncProcessing = false;
  runSync = async () => {
    this._playing.value = false;
    await Promise.all([
      this._playerOneManager.subscription.player.value.stop(),
      this._playerTwoManager.subscription.player.value.stop(),
    ]);

    const [playerOneStartPosition, playerTwoStartPosition] = await Promise.all([
      this._playerOneManager.subscription.player.value.getCurrentPosition(),
      this._playerTwoManager.subscription.player.value.getCurrentPosition(),
    ]);
    this._playerOneStartPosition =
      Math.floor(playerOneStartPosition * 100) / 100;
    this._playerTwoStartPosition =
      Math.floor(playerTwoStartPosition * 100) / 100;
    this._synced.value = true;
    // 同期ぐるぐる
    this._syncIntervalId = setInterval(async () => {
      if (this.syncProcessing) return;
      this.syncProcessing = true;

      const st = new Date().getTime();
      let [playerOneCurrentPosition, playerTwoCurrentPosition] =
        await Promise.all([
          this._playerOneManager.subscription.player.value.getCurrentPosition(),
          this._playerTwoManager.subscription.player.value.getCurrentPosition(),
        ]);
      playerOneCurrentPosition =
        Math.floor(playerOneCurrentPosition * 100) / 100;
      playerTwoCurrentPosition =
        Math.floor(playerTwoCurrentPosition * 100) / 100;
      // 動画が再生しきっていてリピートフラグが立っている場合はリロード
      if (
        (this._playerOneManager.subscription.player.value.subscription.status
          .value === Status.ENDED ||
          this._playerTwoManager.subscription.player.value.subscription.status
            .value === Status.ENDED) &&
        this._repeated.value
      ) {
        console.log(
          "動画が再生しきっていてリピートフラグが立っている場合はリロード"
        );
        this.reload();
        this.syncProcessing = false;
        return;
      }

      if (
        playerOneCurrentPosition < this._playerOneStartPosition ||
        playerTwoCurrentPosition < this._playerTwoStartPosition
      ) {
        // 開始ポジションより手前の場合は開始ポジションに戻す
        console.log("開始ポジションより手前の場合は開始ポジションに戻す");
        this.reload();
        this.syncProcessing = false;
        return;
      }

      const videoOwnPosition =
        playerOneCurrentPosition - this._playerOneStartPosition;
      const videoTwoPosition =
        playerTwoCurrentPosition - this._playerTwoStartPosition;
      // 0.1秒以上ずれていたら同期させる
      const diff = Math.abs(videoOwnPosition - videoTwoPosition);
      if (diff >= 0.1) {
        // this.diff.value.push({
        //   abs: Math.floor(diff * 100) / 100,
        //   own: Math.floor(videoOwnPosition * 100) / 100,
        //   two: Math.floor(videoTwoPosition * 100) / 100,
        // });
        console.log("0.1秒以上ずれていたら同期させる");
        if (videoOwnPosition > videoTwoPosition) {
          this._playerOneManager.subscription.player.value.seekTo(
            playerOneCurrentPosition + diff * -1
          );
          // 片方の動画のみをシークすると「シークのタイムラグ」と「再生され続けている時間」をあわせて0.4秒くらいずれてしまうので意味のないシークを挟む
          // なぜかcurrentPositionより前にシークする時がある。
          this._playerTwoManager.subscription.player.value.seekTo(
            playerTwoCurrentPosition
          );
        } else {
          this._playerOneManager.subscription.player.value.seekTo(
            playerOneCurrentPosition
          );
          this._playerTwoManager.subscription.player.value.seekTo(
            playerTwoCurrentPosition + diff * -1
          );
        }
      }
      this.syncProcessing = false;
    }, 500);
  };

  stopSync = (): void => {
    this.diff.value = [];
    this._synced.value = false;
    clearInterval(this._syncIntervalId);
    this._syncIntervalId = 0;
  };

  get subscription() {
    return {
      videoOwn: computed(() => {
        return this._playerOneManager.subscription.player.value;
      }),
      videoTwo: computed(() => {
        return this._playerTwoManager.subscription.player.value;
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
