<script setup lang="ts">
import HomePage from "./pages/HomePage.vue"
import EditPage from "./pages/EditPage.vue"
import { ref } from "vue"

const appState = ref({
	inEditing: false,
	editingNoteId: 0,
})
</script>

<template>
	<HomePage
		v-if="!appState.inEditing"
		@enter-editing="
			(id) => (appState = { inEditing: true, editingNoteId: id })
		"
	/>
	<EditPage
		v-if="appState.inEditing"
		:id="appState.editingNoteId"
		@exit-editing="
			() => (appState = { inEditing: false, editingNoteId: 0 })
		"
	/>
</template>

<style scoped></style>
