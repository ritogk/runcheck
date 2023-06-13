import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import MainPI from "@/app/pages/main/main-pi.vue"
import RegisterI from "@/app/pages/register/register-i.vue"
import LoginI from "@/app/pages/login/login-i.vue"
import HomeI from "@/app/pages/home/home-i.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index",
    name: "index",
    component: MainPI,
  },
  {
    path: "/main",
    name: "main",
    component: MainPI,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterI,
  },
  {
    path: "/login",
    name: "login",
    component: LoginI,
  },
  {
    path: "/home",
    name: "home",
    component: HomeI,
  },
]

const router = createRouter({
  history: createWebHistory("/app/"),
  routes,
})

export default router
