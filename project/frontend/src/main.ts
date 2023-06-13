import { createApp } from "vue"
import App from "./app.vue"
import router from "./route"

const app = createApp(App)
app.use(router)
app.mount("#app")
