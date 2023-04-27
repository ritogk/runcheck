import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Main from "@/pages/main/Main.vue"
import Register from "@/pages/register/Register.vue"
import Login from "@/pages/login/Login.vue"
import Home from "@/pages/home/Home.vue"
import YoutubeOauthCallback from "@/pages/oauth/YoutubeOauthCallback.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index",
    name: "index",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/youtube-oauth-callback",
    name: "youtube-oauth-callback",
    component: YoutubeOauthCallback,
  },
]

const router = createRouter({
  history: createWebHistory("/app/"),
  routes,
})

export default router
