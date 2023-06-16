const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  configureWebpack: {
    output: {
      filename: "runcheck-[name].js",
      chunkFilename: "runcheck-[name].js",
    },
  },
  css: {
    extract: {
      filename: "runcheck-[name].css",
      chunkFilename: "runcheck-[name].css",
    },
  },
  productionSourceMap: false,
  outputDir: "../backend/public/spa",
  publicPath: "/spa",
  devServer: {
    port: 8080,
    client: {
      webSocketURL: "ws://0.0.0.0:8080/ws",
    },
    allowedHosts: "all",
  },
  transpileDependencies: true,
})
