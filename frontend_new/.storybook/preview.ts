import type { Preview } from "@storybook/vue3"
import "../src/tailwind.css"
import { setupWorker } from "msw"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

// Node 環境ではなくブラウザ環境にいることをチェック
if (typeof global.process === "undefined") {
  // MSW をセットアップ
  const worker = setupWorker()
  // Service Worker を立ち上げる
  worker.start()
  // stories ファイルからアクセスできるように、worker をグローバルに参照できるようにする
  if ("msw" in window) {
    window.msw = { worker }
  }
}

export default preview
