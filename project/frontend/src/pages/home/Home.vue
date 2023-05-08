<template>
  <div class="mx-3">
    <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          ホーム
        </h2>
      </div>
    </div>

    <div class="max-w-[700px] items-center mx-auto">
      <!-- タグ -->
      <Listbox as="div" v-model="selected" class="mb-7">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
          >タグ</ListboxLabel
        >
        <div class="relative mt-2">
          <ListboxButton
            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <span class="block truncate">{{ selected.name }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="person in people"
                :key="person.id"
                :value="person"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ person.name }}</span
                  >

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-indigo-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>

      <div class="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li>
            <a href="#" class="block hover:bg-gray-50">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="truncate text-sm font-medium text-indigo-600">
                    けんぼーさん比較(美浜)
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        viewBox="0 0 162.465 200"
                      >
                        <path
                          d="M61.031,263.266a7.417,7.417,0,0,0-7.3,7.522v13.7H27.817c-5.779,0-11.567,4.487-11.567,11.047V452.223c0,6.56,5.789,11.043,11.567,11.043H167.153c5.779,0,11.562-4.483,11.562-11.043V295.534c0-6.56-5.783-11.047-11.562-11.047H141.238v-13.7a7.416,7.416,0,1,0-14.831,0v13.7H104.9v-13.7a7.415,7.415,0,1,0-14.829,0v13.7H68.559v-13.7a7.417,7.417,0,0,0-7.528-7.522ZM31.086,299.322H53.728v10.041a7.416,7.416,0,1,0,14.832,0V299.322H90.068v10.041a7.417,7.417,0,1,0,14.829,0V299.322h21.51v10.041a7.416,7.416,0,1,0,14.832,0V299.322h22.648V448.435H31.086Zm29.364,37.1a7.046,7.046,0,0,0,0,14.092h74.064a7.046,7.046,0,1,0,0-14.092Zm0,34.112a7.046,7.046,0,1,0,0,14.091h74.064a7.046,7.046,0,1,0,0-14.091Zm0,34.117a7.046,7.046,0,1,0,0,14.091h74.064a7.046,7.046,0,1,0,0-14.091Z"
                          transform="translate(-16.249 -263.266)"
                        />
                      </svg>
                      フィット
                    </p>
                  </div>
                  <div
                    class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                  >
                    <p class="truncate text-sm font-medium text-red-400">
                      削除する
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import {
  CheckIcon,
  ChevronUpDownIcon,
  // TrashIcon,
} from "@heroicons/vue/20/solid"

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
]

const selected = ref(people[3])
</script>
