import { ComputedRef, InjectionKey, computed, ref } from "vue";
import {
  IVideoPlayer,
  VideoType,
} from "@/pages/main/parts/video-area-parts/libs/IVideoPlayer";
import { DummyPlayer } from "@/pages/main/parts/video-area-parts/libs/DummyPlayer";

export interface IPlayerManager {
  changePlayer(player: IVideoPlayer): void;
  subscription: {
    player: ComputedRef<IVideoPlayer>;
  };
}

export class PlayerManager implements IPlayerManager {
  private _player: IVideoPlayer = new DummyPlayer();
  private _videoType = ref(VideoType.NONE);

  changePlayer = (player: IVideoPlayer) => {
    this._player = player;
    this._videoType.value = player.videoType;
  };

  get subscription() {
    return {
      player: computed(() => {
        return this._player.videoType === this._videoType.value
          ? this._player
          : new DummyPlayer();
      }),
      videoType: computed(() => {
        return this._videoType.value;
      }),
    };
  }
}
