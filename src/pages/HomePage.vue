<script setup lang="ts">
import NotePreview from "../components/NotePreview.vue"
import { store } from "../store"
import Button from "../components/Button.vue"
</script>

<template>
	<h1>Заметки</h1>
	<NotePreview
		v-for="note of store.notes"
		:note="note"
		@click="$emit('enterEditing', note)"
	/>
	<Button :type="'add'" @click="$emit('enterEditing', store.newNote())" />
</template>
