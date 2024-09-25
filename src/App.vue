<script setup lang="ts">
import HomePage from "./pages/HomePage.vue"
import EditPage from "./pages/EditPage.vue"
import { ref } from "vue"
import { Note } from "./store"
import LayoutMain from "./layout/LayoutMain.vue"

const appState = ref({
	inEditing: false,
	note: {} as Note,
})
</script>

<template>
	<LayoutMain>
		<HomePage
			v-if="!appState.inEditing"
			@enter-editing="
				(note) => {
					appState.inEditing = true
					appState.note = note
				}
			"
		/>
		<EditPage
			v-if="appState.inEditing"
			:note="appState.note"
			@exit-editing="
			() => {
				appState.inEditing = false
				appState.note = {} as Note
			}
		"
		/>
	</LayoutMain>
</template>

<style scoped></style>
