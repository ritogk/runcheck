<script setup lang="ts">
import { provide } from "vue"
import Dashboard from "@/app/Dashboard.vue"
import Loading from "@/app/Loading.vue"
import "./tailwind.css"
import {
  UseLoading,
  UseLoadingStateKey,
} from "@/app/loading-parts/LoadingState"

const useLoading = UseLoading()
provide(UseLoadingStateKey, useLoading)
useLoading.load()
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-950 p-10">
    <div
      class="flex w-3/4 flex-col gap-2 bg-gray-800 p-5 px-10 text-white md:w-3/5"
    >
      <h1 class="py-5 text-lg">Reviews</h1>
      <div
        class="flex rounded-md border border-gray-200 bg-gray-600 bg-opacity-20"
      >
        <ion-icon class="p-3 py-4" name="search-outline"></ion-icon>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Search Review"
          class="bg-transparent p-2 focus:outline-none"
        />
      </div>

      <!-- Tags -->
      <div class="flex w-full flex-wrap gap-2 py-2">
        <span class="bg-gray-950 bg-opacity-30 p-1 px-2 hover:bg-blue-400"
          >Experience</span
        >
        <span class="bg-gray-950 bg-opacity-30 p-1 px-2 hover:bg-blue-400"
          >Quality</span
        >
        <span class="bg-gray-950 bg-opacity-30 p-1 px-2 hover:bg-blue-400"
          >Design</span
        >
        <span class="bg-gray-950 bg-opacity-30 p-1 px-2 hover:bg-blue-400"
          >Size</span
        >
        <span class="bg-gray-950 bg-opacity-30 p-1 px-2 hover:bg-blue-400"
          >Features</span
        >
        <span class="bg-gray-950 bg-opacity-30 p-1 px-2 hover:bg-blue-400"
          >Value</span
        >
        <span class="bg-gray-950 bg-opacity-30 p-1 px-2 hover:bg-blue-400"
          >Relplacement</span
        >
      </div>

      <!-- Item Container -->
      <div class="mt-14 flex flex-col gap-3">
        <div class="flex flex-col gap-4 bg-gray-700 p-4">
          <!-- Profile and Rating -->
          <div class="justify flex justify-between">
            <div class="flex gap-2">
              <div class="h-7 w-7 rounded-full bg-red-500 text-center">J</div>
              <span>Jess Hopkins</span>
            </div>
            <div class="flex gap-1 p-1 text-orange-300">
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star-half"></ion-icon>
            </div>
          </div>

          <div>
            Gorgeous design! Even more responsive than the previous version. A
            pleasure to use!
          </div>

          <div class="flex justify-between">
            <span>Feb 13, 2021</span>
            <button
              class="border border-gray-950 bg-gray-900 bg-opacity-60 p-1 px-2 hover:bg-gray-950"
            >
              <ion-icon name="share-outline"></ion-icon> Share
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 bg-gray-700 p-4">
          <!-- Profile and Rating -->
          <div class="justify flex justify-between">
            <div class="flex gap-2">
              <div class="h-7 w-7 rounded-full bg-yellow-500 text-center">
                A
              </div>
              <span>Alice Banks</span>
            </div>
            <div class="flex gap-1 p-1 text-orange-300">
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
            </div>
          </div>

          <div>
            The device has a clean design and the metal housing feels sturdy in
            my hands. Soft rounded corners make it a pleasure to look at.
          </div>

          <div class="flex justify-between">
            <span>Feb 13, 2021</span>
            <button
              class="border border-gray-950 bg-gray-900 bg-opacity-60 p-1 px-2 hover:bg-gray-950"
            >
              <ion-icon name="share-outline"></ion-icon> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dashboard class="touch-manipulation" />
  <Loading v-if="useLoading.subscription.isLoading.value"></Loading>
</template>
