<script setup lang="ts">
import NotePreview from "../components/NotePreview.vue"
import { store } from "../store"
import IconAdd from "../assets/icon-add.vue"
</script>

<template>
	<div class="layout">
		<h1>Заметки</h1>
		<NotePreview
			v-for="note of store.notes"
			:note="note"
			@click="$emit('enterEditing', note.id)"
		/>
		<button class="add-note">
			<IconAdd :style="{ fill: 'rgb(0 154 92)' }" />
		</button>
	</div>
</template>

<style scoped>
.layout {
	display: flex;
	flex-flow: column;
	gap: 20px;
}
.add-note {
	background: none;
	color: inherit;
	padding: 10px 10px 6px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	width: 100%;
	border: 2px solid rgb(0 154 92 / 50%);
	box-shadow: rgb(0 189 113 / 20%) 0 0 0 0;
	border-radius: 10px;
	transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
}
.add-note:hover {
	border: 2px solid rgb(0 154 92);
	box-shadow: rgb(0 189 113 / 80%) 0 0 10px 0;
}
</style>
