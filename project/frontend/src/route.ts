import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Main from "@/pages/dashboard/parts/Main.vue"
import Register from "@/pages/dashboard/parts/Register.vue"
import Login from "@/pages/dashboard/parts/Login.vue"
import Home from "@/pages/dashboard/parts/Home.vue"

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
