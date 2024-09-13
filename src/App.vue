<script setup lang="ts">
import HomePage from "./pages/HomePage.vue";
import EditPage from "./pages/EditPage.vue";
import { ref, computed } from "vue";

const isEdit = ref(false);

const currentView = computed(() => {
  return isEdit.value ? EditPage : HomePage;
});
</script>

<template>
  <component :is="currentView" />
</template>

<style scoped></style>
