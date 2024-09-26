<script setup lang="ts">
import NotePreview from "@/components/NotePreview.vue"
import Button from "@/components/Button.vue"

import { store } from "@/store"

defineEmits(["enterEditing"])
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
