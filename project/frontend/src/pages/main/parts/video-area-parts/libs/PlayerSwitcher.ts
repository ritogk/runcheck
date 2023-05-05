import { ComputedRef, InjectionKey, computed, ref } from "vue";
import {
  IVideoPlayer,
  VideoType,
} from "@/pages/main/parts/video-area-parts/libs/IVideoPlayer";
import { DummyPlayer } from "@/pages/main/parts/video-area-parts/libs/DummyPlayer";
import { YouTubePlayer } from "@/pages/main/parts/video-area-parts/libs/YouTubePlayer";
import { LocalVideoPlayer } from "@/pages/main/parts/video-area-parts/libs/LocalVideoPlayer";

export interface IPlayerSwitcher {
  changePlayer(videoType: VideoType): void;
  subscription: {
    player: ComputedRef<IVideoPlayer>;
    videoType: ComputedRef<VideoType>;
  };
}

export class PlayerSwitcher implements IPlayerSwitcher {
  private _players: (DummyPlayer | YouTubePlayer | LocalVideoPlayer)[] = [];
  private _currentVideoType = ref(VideoType.NONE);

  constructor() {
    this._players.push(new DummyPlayer());
    window.addEventListener("load", () => {
      this._players.push(
        new YouTubePlayer(
          "youtube-video-own",
          "https://www.youtube.com/embed/dwnp189UVb8"
        )
      );
      this._players.push(
        new LocalVideoPlayer(
          document.getElementById("local-video-own") as HTMLVideoElement,
          ""
        )
      );
      console.log(this._players); // (3) [DummyPlayer, YouTubePlayer, LocalVideoPlayer] ※ログに3要素表示されるからフィールドには入ってるはず。
    });
  }

  changePlayer = (videoType: VideoType) => {
    console.log(this._players); // [DummyPlayer] // ※なぜか1要素しか表示されない。
    this._currentVideoType.value = videoType;
  };

  get subscription() {
    return {
      player: computed(() => {
        const player = this._players.find((x) => {
          return x.videoType === this._currentVideoType.value;
        });
        return player ?? this._players[0];
      }),
      videoType: computed(() => this._currentVideoType.value),
    };
  }
}
