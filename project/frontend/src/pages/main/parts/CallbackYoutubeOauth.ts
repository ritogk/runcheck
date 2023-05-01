import { inject } from "vue";
import { useRouter } from "vue-router";
import { YoutubeApi } from "@/core/openapiClient";
import {
  useAlretListStateKey,
  useAlretListStateType,
} from "@/pages/dashboard/parts/AlretList/useAlretListState";
import { UseMainStateKey, UseMainStateType } from "@/pages/main/UseMainState";

export const callbackYoutubeOauth = async (code: string) => {
  const router = useRouter();
  debugger;
  const useAlretListState = inject(
    useAlretListStateKey
  ) as useAlretListStateType;
  const useMainState = inject(UseMainStateKey) as UseMainStateType;

  const youtubeApi = new YoutubeApi();
  try {
    await youtubeApi.youtubeOauthPost({ inlineObject2: { code: code } });
    debugger;
    useMainState.youtubeModal.load();
  } catch {
    useAlretListState.add("Youtubeとの連携でエラーが発生しました。");
  }
  router.push({ name: "index" });
};
