<template>
  <Dashboard />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Dashboard from "./pages/Dashboard.vue"
import "./tailwind.css"

@Options({
  components: {
    Dashboard,
  },
})
export default class App extends Vue {}
</script>
