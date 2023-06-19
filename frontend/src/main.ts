import { createApp } from "vue"
import AppP from "./app-p.vue"
import router from "./route"
import { VueQueryPlugin } from "@tanstack/vue-query"

const app = createApp(AppP)
app.use(router)
app.use(VueQueryPlugin)
app.mount("#app")
