<script setup lang="ts">
import { onMounted } from "vue"
import NotePreview from "@/components/NotePreview.vue"
import Button from "@/components/Button.vue"

import { store } from "@/store"
import { Note } from "@/types"
import { getNotes } from "@/utils/localStorage"

defineEmits(["enterEditing"])

onMounted(() => {
	const notes = JSON.parse(getNotes()) as Note[]
	if (notes) store.setNotes(notes)
})
</script>

<template>
	<h1>Заметки</h1>
	<NotePreview
		v-for="note of store.notes"
		:note="note"
		@click="$emit('enterEditing', note)"
	/>
	<Button type="add" @click="$emit('enterEditing', store.newNote())" />
</template>
