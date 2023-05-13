import { ComputedRef, computed, ref } from "vue"
import {
  IVideoPlayer,
  VideoType,
} from "@/app/pages/main/main-parts/player-area-parts/IVideoPlayer"
import { DummyPlayer } from "@/app/pages/main/main-parts/player-area-parts/DummyPlayer"

export interface IPlayerManager {
  changePlayer(player: IVideoPlayer): void
  subscription: {
    player: ComputedRef<IVideoPlayer>
    videoType: ComputedRef<VideoType>
  }
}

export class PlayerManager implements IPlayerManager {
  private _player: IVideoPlayer = new DummyPlayer()
  private _videoType = ref(VideoType.NONE)

  changePlayer = (player: IVideoPlayer) => {
    this._player = player
    this._videoType.value = player.VIDEO_TYPE
  }

  subscription = {
    player: computed(() => {
      return this._player.VIDEO_TYPE === this._videoType.value
        ? this._player
        : new DummyPlayer()
    }),
    videoType: computed(() => {
      return this._videoType.value
    }),
  }
}
