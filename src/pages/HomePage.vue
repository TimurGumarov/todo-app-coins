<script setup lang="ts">
import NotePreview from "../components/NotePreview.vue"
import { store } from "../store"
import ButtonAdd from "../components/ButtonAdd.vue"
</script>

<template>
	<div class="layout">
		<h1>Заметки</h1>
		<NotePreview
			v-for="note of store.notes"
			:note="note"
			@click="$emit('enterEditing', note.id)"
		/>
		<ButtonAdd class="addNoteButton" />
	</div>
</template>

<style scoped>
.layout {
	display: flex;
	flex-flow: column;
	gap: 20px;
}
</style>
