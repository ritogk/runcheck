<template>
  <Dashboard />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Dashboard from "./components/Dashboard.vue"
import "./tailwind.css"

@Options({
  components: {
    Dashboard,
  },
})
export default class App extends Vue {}
</script>
