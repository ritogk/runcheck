<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import {
  GiftIcon,
  BoltIcon,
  VideoCameraIcon,
  FaceSmileIcon,
  ShareIcon
} from "@heroicons/vue/24/outline"

const router = useRouter()
const route = useRoute()

type Locale = "ja" | "en"

const messages: Record<Locale, Record<string, string>> = {
  ja: {
    "nav.features": "基本機能",
    "nav.demo": "デモ",
    "nav.screenshots": "スクリーンショット",
    "nav.start": "今すぐ起動",
    "nav.contact": "お問い合わせ",
    "hero.title": "車載動画でサーキットを攻略！タイムアップのための比較アプリ",
    "hero.description":
      "サーキットに特化した車載動画比較アプリ。気になるあの人やベストラップとセカンドラップ等の比較が無料で簡単に行えます。youtubeで公開されている全ての車載動画と比較が行えるので比較対象は無限大！！",
    "feature.free.title": "完全無料",
    "feature.free.desc": "すべてのサービスを完全無料でご利用いただけます。",
    "feature.sports.title": "ｽﾎﾟｰﾂ走行に特化",
    "feature.sports.desc": "スポーツ走行向けに使いやすいよう調整しております。",
    "feature.video.title": "様々な動画に対応",
    "feature.video.desc": "youtube又は端末内の全ての動画に対応",
    "feature.easy.title": "簡単操作",
    "feature.easy.desc": "複雑な操作はありません。",
    "feature.share.title": "SNS共有可能",
    "feature.share.desc": "比較した内容をSNSで共有できます。",
    "section.features": "基本機能",
    "section.demo": "デモ",
    "section.screenshots": "スクリーンショット",
    "section.start": "今すぐ起動",
    "func.compare": "youtube又は端末内の動画の比較",
    "func.save": "比較した結果の保存(ユーザー登録する必要あり)",
    "func.share": "比較した結果をツイッター等で共有"
  },
  en: {
    "nav.features": "Basic Functions",
    "nav.demo": "Demo",
    "nav.screenshots": "Screenshots",
    "nav.start": "Start Now",
    "nav.contact": "Contact Us",
    "hero.title":
      "Take on the circuit with in-car video! Comparison app for improving times.",
    "hero.description":
      "An in-car video comparison app specialising in circuits. You can easily compare the best lap with the second lap, etc. with all the in-car videos on youtube, so the comparison targets are endless!",
    "feature.free.title": "Completely free of charge",
    "feature.free.desc": "All services are completely free of charge.",
    "feature.sports.title": "Specialized for sports driving",
    "feature.sports.desc":
      "We have adjusted the software to be easy to use for sports driving.",
    "feature.video.title": "Support for a wide range of videos",
    "feature.video.desc": "Compatible with all videos on youtube or on your device.",
    "feature.easy.title": "Easy to use",
    "feature.easy.desc": "No complicated operations.",
    "feature.share.title": "SNS sharing",
    "feature.share.desc": "You can share your comparisons on SNS.",
    "section.features": "Basic Functions",
    "section.demo": "Demo",
    "section.screenshots": "Screenshots",
    "section.start": "Start Now",
    "func.compare": "Comparison of videos on youtube or in your device",
    "func.save": "Save comparison results (user registration required)",
    "func.share": "Share the comparison results on Twitter, etc."
  }
}

const initialLocale = (route.params.locale as Locale) || "ja"
const locale = ref<Locale>(initialLocale)

const t = (key: string): string => {
  return messages[locale.value][key] ?? key
}

const setLocale = (next: Locale) => {
  locale.value = next
  router.replace({ name: "lp", params: { locale: next } })
}

const handleStartApp = () => {
  router.push({ name: "index" })
}

const features = computed(() => [
  { icon: GiftIcon, titleKey: "feature.free.title", descKey: "feature.free.desc" },
  { icon: BoltIcon, titleKey: "feature.sports.title", descKey: "feature.sports.desc" },
  { icon: VideoCameraIcon, titleKey: "feature.video.title", descKey: "feature.video.desc" },
  { icon: FaceSmileIcon, titleKey: "feature.easy.title", descKey: "feature.easy.desc" },
  { icon: ShareIcon, titleKey: "feature.share.title", descKey: "feature.share.desc" }
])

const basicFunctions = computed(() => [
  t("func.compare"),
  t("func.save"),
  t("func.share")
])
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a class="text-xl font-bold text-gray-900" href="#top">RunCheck</a>
        <div class="flex items-center gap-6">
          <div class="hidden gap-6 text-sm font-medium text-gray-600 sm:flex">
            <a class="hover:text-gray-900" href="#features">{{ t("nav.features") }}</a>
            <a class="hover:text-gray-900" href="#demo">{{ t("nav.demo") }}</a>
            <a class="hover:text-gray-900" href="#screenshot">{{ t("nav.screenshots") }}</a>
            <a class="hover:text-gray-900" href="#startnow">{{ t("nav.start") }}</a>
            <a class="hover:text-gray-900" href="https://twitter.com/homing_fd2">{{
              t("nav.contact")
            }}</a>
          </div>
          <!-- Language Toggle -->
          <div class="flex items-center gap-1">
            <button
              class="rounded-md border px-2 py-1 hover:bg-gray-100"
              :class="locale === 'ja' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'"
              @click="setLocale('ja')"
            >
              <img class="h-4 w-6 object-cover" src="/lp/img/flags/Japan.png" alt="日本語" />
            </button>
            <button
              class="rounded-md border px-2 py-1 hover:bg-gray-100"
              :class="locale === 'en' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'"
              @click="setLocale('en')"
            >
              <img
                class="h-4 w-6 object-cover"
                src="/lp/img/flags/United-States.png"
                alt="English"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <header id="top" class="bg-gradient-to-br from-slate-50 to-slate-200 pb-16 pt-24">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-10 px-5 lg:flex-row">
        <div class="text-center lg:w-1/2 lg:text-left">
          <h1
            class="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {{ t("hero.title") }}
          </h1>
          <p class="mb-8 text-base leading-relaxed text-gray-500 sm:text-lg">
            {{ t("hero.description") }}
          </p>
          <a href="#" @click.prevent="handleStartApp()">
            <img
              class="mx-auto h-12 lg:mx-0"
              src="/lp/img/startapp.png"
              :alt="t('nav.start')"
            />
          </a>
        </div>
        <div class="flex justify-center lg:w-1/2">
          <div class="relative">
            <div
              class="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-indigo-600/10 to-purple-600/10"
            ></div>
            <img
              class="relative w-64 rounded-2xl shadow-xl"
              src="/lp/img/iphone-demo.gif"
              :alt="t('nav.demo')"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Logo -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 text-center">
      <img class="mx-auto w-48" src="/lp/img/homisoftware-logo.svg" alt="HomiSoftware" />
    </div>

    <!-- Features -->
    <section id="features" class="py-16">
      <div class="mx-auto max-w-4xl px-5">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="f in features" :key="f.titleKey" class="text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-2xl text-white"
            >
              <component :is="f.icon" class="h-8 w-8" />
            </div>
            <h3 class="mb-2 text-lg font-bold text-gray-900">{{ t(f.titleKey) }}</h3>
            <p class="text-sm text-gray-500">{{ t(f.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Basic Functions -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-4xl px-5">
        <h2 class="mb-6 text-3xl font-bold text-gray-900">{{ t("section.features") }}</h2>
        <ul class="space-y-2 text-lg text-gray-500">
          <li v-for="fn in basicFunctions" :key="fn">・{{ fn }}</li>
        </ul>
      </div>
    </section>

    <!-- Demo -->
    <section id="demo" class="py-16">
      <div class="mx-auto max-w-4xl px-5">
        <h2 class="mb-6 text-3xl font-bold text-gray-900">{{ t("section.demo") }}</h2>
        <div class="overflow-hidden rounded-lg shadow-lg">
          <iframe
            class="aspect-video w-full"
            src="https://www.youtube.com/embed/2yt_BNky6Kg"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <!-- Screenshots -->
    <section id="screenshot" class="bg-gray-50 py-16">
      <div class="mx-auto max-w-4xl px-5">
        <h2 class="mb-6 text-3xl font-bold text-gray-900">{{ t("section.screenshots") }}</h2>
        <div class="grid grid-cols-3 gap-4">
          <img
            class="rounded-lg"
            src="/lp/img/screenshot3.jpg"
            :alt="t('section.screenshots')"
          />
          <img
            class="rounded-lg"
            src="/lp/img/screenshot1.jpg"
            :alt="t('section.screenshots')"
          />
          <img
            class="rounded-lg"
            src="/lp/img/screenshot2.jpg"
            :alt="t('section.screenshots')"
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      id="startnow"
      class="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-center"
    >
      <h2 class="mb-6 text-3xl font-bold text-white">{{ t("section.start") }}</h2>
      <a href="#" @click.prevent="handleStartApp()">
        <img class="mx-auto h-12" src="/lp/img/startapp.png" :alt="t('nav.start')" />
      </a>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 py-6 text-center">
      <a class="text-sm text-gray-400 hover:text-white" href="https://twitter.com/homing_fd2">
        {{ t("nav.contact") }}
      </a>
    </footer>
  </div>
</template>
