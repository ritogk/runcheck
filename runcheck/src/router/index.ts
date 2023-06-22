import { createRouter, createWebHistory } from "vue-router"
import MainPagePI from "@/app/pages/main-page-pi.vue"
import RegisterPageI from "@/app/pages/register-page-i.vue"
import LoginPageI from "@/app/pages/login-page-i.vue"
import HomePageI from "@/app/pages/home-page-i.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/index",
      name: "index",
      component: MainPagePI
    },
    {
      path: "/main",
      name: "main",
      component: MainPagePI
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPageI
    },
    {
      path: "/login",
      name: "login",
      component: LoginPageI
    },
    {
      path: "/home",
      name: "home",
      component: HomePageI
    }
  ]
})

export default router
