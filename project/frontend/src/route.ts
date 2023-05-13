import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Main from "@/app/pages/main/Main.vue"
import Register from "@/app/pages/register/Register.vue"
import Login from "@/app/pages/login/Login.vue"
import Home from "@/app/pages/home/Home.vue"

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
]

const router = createRouter({
  history: createWebHistory("/app/"),
  routes,
})

export default router
