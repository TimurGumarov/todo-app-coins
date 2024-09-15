<script setup lang="ts">
import { PropType } from "vue"
import { Note } from "../store"

// This sets the number of tasks to preview for each note
const tasksPreviewCount = 2

const props = defineProps({
	note: Object as PropType<Note>,
})
</script>

<template>
	<div v-if="props.note" :key="props.note.id" @click="$emit('click')">
		<h3>{{ props.note.title }}</h3>
		<ul v-if="props.note.tasks?.length">
			<li
				v-for="task of props.note.tasks.slice(0, tasksPreviewCount)"
				:key="task.id"
			>
				{{ task.text }}
			</li>
			<li v-if="props.note.tasks.length > tasksPreviewCount">…</li>
		</ul>
	</div>
</template>

<style scoped>
div {
	display: flex;
	flex-flow: column;
	gap: 10px;
	border: 1px solid #333;
	border-radius: 10px;
	margin: 0;
	padding: 20px;
	cursor: pointer;
}
h3 {
	margin: 0;
}
</style>
