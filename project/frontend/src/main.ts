import { createApp } from "vue"
import AppP from "./app-p.vue"
import router from "./route"

const app = createApp(AppP)
app.use(router)
app.mount("#app")
