<script setup lang="ts">
import { store } from "../store"

const props = defineProps({
	id: Number,
})

const currentNote = store.notes.filter((note) => note.id === props.id)?.pop()
</script>

<template>
	<div class="layout" v-if="currentNote">
		<h1>{{ currentNote.title }}</h1>
		<div class="note" @click="$emit('exitEditing')">
			<ul v-if="currentNote.tasks?.length">
				<li v-for="task of currentNote.tasks" :key="task.id">
					{{ task.id }} {{ task.text }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.layout {
	display: flex;
	flex-flow: column;
	gap: 20px;
}
.note {
	display: flex;
	flex-flow: column;
	gap: 10px;
}
</style>
