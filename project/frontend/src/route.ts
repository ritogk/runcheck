import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import MainT from "@/app/pages/main/main-t.vue"
import RegisterT from "@/app/pages/register/register-t.vue"
import LoginT from "@/app/pages/login/login-t.vue"
import HomeT from "@/app/pages/home/home-t.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index",
    name: "index",
    component: MainT,
  },
  {
    path: "/main",
    name: "main",
    component: MainT,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterT,
  },
  {
    path: "/login",
    name: "login",
    component: LoginT,
  },
  {
    path: "/home",
    name: "home",
    component: HomeT,
  },
]

const router = createRouter({
  history: createWebHistory("/app/"),
  routes,
})

export default router
