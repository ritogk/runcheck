import { createApp } from "vue"
import AppP from "./app-p.vue"
import router from "./router"
import { VueQueryPlugin } from "@tanstack/vue-query"
import "./tailwind.css"

const app = createApp(AppP)
app.use(router)
app.use(VueQueryPlugin)
app.mount("#app")
