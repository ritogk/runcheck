import { createRouter, createWebHistory } from "vue-router"
import MainPagePI from "@/app/pages/main-page-pi.vue"
import RegisterPageI from "@/app/pages/register-page-i.vue"
import LoginPageI from "@/app/pages/login-page-i.vue"
import HomePageI from "@/app/pages/home-page-i.vue"
import LpPageI from "@/app/pages/lp-page-i.vue"

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "index",
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
    },
    {
      path: "/lp/:locale?",
      name: "lp",
      component: LpPageI
    }
  ]
})

export default router
