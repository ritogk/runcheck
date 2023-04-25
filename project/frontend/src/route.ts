import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Main from "@/pages/Main.vue"
import Register from "@/pages/Register.vue"
import Login from "@/pages/Login.vue"
import Home from "@/pages/Home.vue"

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
